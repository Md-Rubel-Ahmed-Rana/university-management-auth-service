import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  default_user_password: process.env.DEFAULT_STUDENT_PASS,
}
