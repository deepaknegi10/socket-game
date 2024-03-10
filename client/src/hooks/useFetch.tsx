import { useEffect, useState } from "react"

enum RequestMethod {
  GET = "GET",
  HEAD = "HEAD",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
}

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const useFetch = <T,>(
  url: string,
  method: RequestMethod = RequestMethod.GET
): ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
        })
        const responseFinal = await response.json()
        setData(responseFinal)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData().then((r) => r)
  }, [method, url])

  return { data, loading, error }
}

export { useFetch }
