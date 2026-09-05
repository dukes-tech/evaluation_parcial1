import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qpweshbbpgshehiimuvh.supabase.co';
const supabaseKey = 'sb_publishable_Wb0wdVozpkgAiTxduuneXw_IEBLSypL';

export const supabase = createClient(supabaseUrl, supabaseKey);

