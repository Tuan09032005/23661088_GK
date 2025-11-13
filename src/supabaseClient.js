import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vfqrlmongymzyfgyvjhl.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcXJsbW9uZ3ltenlmZ3l2amhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODI1MjUsImV4cCI6MjA3NzM1ODUyNX0.pjqXTgm7R75GOgFGV4daYXov5phGc2o8Etz0o0MZiBg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
