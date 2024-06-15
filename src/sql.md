-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS update_order_trigger ON plans;

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.update_order_values;