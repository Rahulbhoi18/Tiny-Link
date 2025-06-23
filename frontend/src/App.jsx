import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Link, BarChart3, Calendar, ExternalLink, Trash2 } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
const URLShortenerComponent = ({ handleShorten, url, setUrl, isLoading }) => {
  const [isLoading , setIsLoading] = useState(false);
  return (
    <div className="max-w-4xl mx-auto mb-8 shadow-2xl py-5">
      <CardHeader>
        <CardTitle className="text-2xl">Shorten Your URL</CardTitle>
        <CardDescription>Paste your long URL below and get a shortened version instantly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Input
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 h-12 text-lg mt-2"
            onKeyPress={(e) => e.key === "Enter" && handleShorten()}
          />
          <Button onClick={handleShorten} disabled={isLoading} className="h-12 px-8 bg-blue-600 hover:bg-blue-700 mt-2">
            {isLoading ? "Shortening..." : "Shorten URL"}
          </Button>
        </div>
      </CardContent>
    </div>
  )
}

const DashboardComponent = ({ shortenedUrls, copyToClipboard, deleteUrl, formatDate }) => {
  return (
    <div className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Your Links
        </CardTitle>
        <CardDescription>Manage and track all your shortened URLs</CardDescription>
      </CardHeader>
      <CardContent>
        {shortenedUrls.length === 0 ? (
          <div className="text-center py-12">
            <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No shortened URLs yet</p>
            <p className="text-sm text-gray-400">Create your first short link above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shortenedUrls.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {item.shortUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(item.shortUrl)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{item.originalUrl}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        {item.clicks} clicks
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.clicks > 100 ? "Popular" : item.clicks > 50 ? "Active" : "New"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUrl(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}

const AnalyticsComponent = ({ shortenedUrls }) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Link className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{shortenedUrls.length}</p>
                <p className="text-sm text-gray-600">Total Links</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {shortenedUrls.reduce((sum, url) => sum + url.clicks, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {shortenedUrls.filter((url) => new Date().getTime() - new Date(url.createdAt).getTime() < 86400000).length}
                </p>
                <p className="text-sm text-gray-600">Links Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState("shorten")
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shortenedUrls, setShortenedUrls] = useState([])

  const handleShorten = () => {
    if (!url.trim()) {
      toast({ title: "Error", description: "Please enter a valid URL", variant: "destructive" })
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      const shortCode = Math.random().toString(36).substring(2, 8)
      const newUrl = {
        id: Date.now().toString(),
        originalUrl: url,
        shortUrl: `https://short.ly/${shortCode}`,
        shortCode,
        clicks: 0,
        createdAt: new Date(),
      }
      setShortenedUrls((prev) => [newUrl, ...prev])
      setUrl("")
      setIsLoading(false)
      toast({ title: "Success!", description: "URL shortened successfully" })
    }, 1000)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: "Copied!", description: "URL copied to clipboard" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy URL", variant: "destructive" })
    }
  }

  const deleteUrl = (id) => {
    setShortenedUrls((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Deleted", description: "URL removed successfully" })
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shorten Your URLs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create short, memorable links that are easy to share. Track clicks, manage your links, and get detailed
            analytics.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="shorten">Shorten</TabsTrigger>
            <TabsTrigger value="dashboard">My Links</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="shorten">
            <URLShortenerComponent handleShorten={handleShorten} url={url} setUrl={setUrl} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="dashboard">
            <DashboardComponent
              shortenedUrls={shortenedUrls}
              copyToClipboard={copyToClipboard}
              deleteUrl={deleteUrl}
              formatDate={formatDate}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsComponent shortenedUrls={shortenedUrls} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}