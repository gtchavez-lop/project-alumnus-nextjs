import { createClient } from '@supabase/supabase-js'

let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let url = process.env.NEXT_PUBLIC_SUPABASE_URL;

const _SupabaseClient = createClient(url, key);

export default _SupabaseClient