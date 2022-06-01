import { createClient } from '@supabase/supabase-js';
import { config } from './envConfig';

const SUPABASE_URL = 'https://wlbmqnuarefzyfgzofix.supabase.co';

export const getSupabaseService = (e) =>
  createClient(SUPABASE_URL, process.env.SERVICE_KEY);
