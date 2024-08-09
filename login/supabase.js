import { createClient } from '@supabase/supabase-js'

// Substitua com a URL do seu projeto Supabase
const supabaseUrl = 'https://toaencryhzhrkjoxftpt.supabase.co'
// Substitua com a chave pública fornecida pelo Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWVuY3J5aHpocmtqb3hmdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MTc0NzMsImV4cCI6MjAzNzQ5MzQ3M30.MGNDyPW3y_3b8SeyiQjLo_lPMUa3hcIU4abyOJZIBB4'

export const supabase = createClient(supabaseUrl, supabaseKey)
