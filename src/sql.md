-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS update_order_trigger ON plans;

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.update_order_values;

DROP FUNCTION IF EXISTS process_order_updates CASCADE;

CREATE OR REPLACE FUNCTION process_order_updates() RETURNS TRIGGER AS $$
DECLARE
    v_new_order INT;
    v_old_order INT;
    v_parent_id INT;
BEGIN
    -- Check if the trigger is already processing
    IF current_setting('myapp.trigger_active', true) = 'true' THEN
        RETURN NEW;
    END IF;

    -- Set the session variable to indicate the trigger is active
    PERFORM set_config('myapp.trigger_active', 'true', true);

    v_new_order := NEW."order";
    v_old_order := OLD."order";
    v_parent_id := NEW."parentId";

    -- If the row is moving down in the order
    IF v_old_order < v_new_order THEN
        -- Decrement order values
        UPDATE plans
        SET "order" = "order" - 1
        WHERE "parentId" IS NOT DISTINCT FROM v_parent_id
          AND "order" > v_old_order
          AND "order" <= v_new_order;
    -- If the row is moving up in the order
    ELSEIF v_old_order > v_new_order THEN
        -- Increment order values
        UPDATE plans
        SET "order" = "order" + 1
        WHERE "parentId" IS NOT DISTINCT FROM v_parent_id
          AND "order" < v_old_order
          AND "order" >= v_new_order;
    END IF;

    -- Ensure the updated row has the correct order
    NEW."order" := v_new_order;

    -- Reset the session variable
    PERFORM set_config('myapp.trigger_active', 'false', true);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the existing trigger if any
DROP TRIGGER IF EXISTS update_order_trigger ON plans CASCADE;

-- Create the trigger to call the function on update
CREATE TRIGGER update_order_trigger
BEFORE UPDATE OF "order" ON plans
FOR EACH ROW
EXECUTE FUNCTION process_order_updates();