import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shortenedUrl, setShortenedUrl] = useState(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleShorten = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      })
      return
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const shortCode = Math.random().toString(36).substring(2, 8)
      const newShortenedUrl = {
        id: Date.now().toString(),
        originalUrl: url,
        shortUrl: `https://lnk.sh/${shortCode}`,
        shortCode,
        createdAt: new Date().toISOString(),
      }

      setShortenedUrl(newShortenedUrl)
      setIsLoading(false)

      const existingUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
      existingUrls.unshift(newShortenedUrl)
      localStorage.setItem("shortenedUrls", JSON.stringify(existingUrls))

      toast({
        title: "Success!",
        description: "Your URL has been shortened successfully",
      })
    }, 1500)
  }

  const handleCopy = async () => {
    if (shortenedUrl) {
      await navigator.clipboard.writeText(shortenedUrl.shortUrl)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setUrl("")
    setShortenedUrl(null)
    setCopied(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">Shorten Your URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="Enter your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleShorten}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {shortenedUrl && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">URL shortened successfully!</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Original URL:</label>
                <div className="flex items-center mt-1 p-3 bg-white rounded-md border">
                  <span className="text-gray-600 truncate flex-1">{shortenedUrl.originalUrl}</span>
                  <Button variant="ghost" size="sm" onClick={() => window.open(shortenedUrl.originalUrl, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Shortened URL:</label>
                <div className="flex items-center mt-1 p-3 bg-white rounded-md border">
                  <span className="text-blue-600 font-medium flex-1">{shortenedUrl.shortUrl}</span>
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="ml-2">
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700">
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(shortenedUrl.shortUrl, "_blank")}
                  className="bg-white text-gray-900"
                >
                  Test Link
                </Button>
                <Button variant="outline" onClick={handleReset} className="bg-white text-gray-900">
                  Shorten Another
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
