
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://idolpbqftdfuymdfvbct.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlkb2xwYnFmdGRmdXltZGZ2YmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MjY5NDgsImV4cCI6MjA4MTQwMjk0OH0.0LEnd4AjzniSTeNZ8fLPm1AvgbducVQ0czP4wIs-gi0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
