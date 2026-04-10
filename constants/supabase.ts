import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = 'https://scvuwmquzwhfnuahzfhz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdnV3bXF1endoZm51YWh6Zmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDg2NDYsImV4cCI6MjA5MDk4NDY0Nn0.JN50NxUqSbwKeL5veq5UMFQJJ5GMOZt6F3OUCRh5kz0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage:            AsyncStorage, // persists session across app restarts
    autoRefreshToken:   true,         // silently refreshes expired tokens
    persistSession:     true,         // writes session to AsyncStorage
    detectSessionInUrl: false,        // must be false in React Native
  },
});