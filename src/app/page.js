"use client"
import { useRouter } from 'next/navigation'
export default function Home(props) {
  const router = useRouter()
  if(router) {
    return router.push("./login");
  }
}
