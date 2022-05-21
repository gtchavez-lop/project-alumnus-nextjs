import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wlbmqnuarefzyfgzofix.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYm1xbnVhcmVmenlmZ3pvZml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ3MjMyMzYsImV4cCI6MTk2MDI5OTIzNn0.mPv23RhIkMF0VxvubjusHsfAIU-54lmohoXazwQqujk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
