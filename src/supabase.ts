import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qwgyovopsggcxoshsfal.supabase.co"
export const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Z3lvdm9wc2dnY3hvc2hzZmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTUwNzYsImV4cCI6MjA0NTI3MTA3Nn0.zLhkYnGlH8hbopFsofi6qmK1hhAjnx71ybnBK-txhD8";

export const supabase = createClient(supabaseUrl, supabaseKey);