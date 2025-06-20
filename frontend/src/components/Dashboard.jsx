"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Trash2, Search, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Dashboard() {
  const [urls, setUrls] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUrls, setFilteredUrls] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
    const urlsWithClicks = savedUrls.map((url) => ({
      ...url,
      clicks: url.clicks || Math.floor(Math.random() * 100),
    }))
    setUrls(urlsWithClicks)
    setFilteredUrls(urlsWithClicks)
  }, [])

  useEffect(() => {
    const filtered = urls.filter(
      (url) =>
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUrls(filtered)
  }, [searchTerm, urls])

  const handleCopy = async (shortUrl) => {
    await navigator.clipboard.writeText(shortUrl)
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    })
  }

  const handleDelete = (id) => {
    const updatedUrls = urls.filter((url) => url.id !== id)
    setUrls(updatedUrls)
    localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls))
    toast({
      title: "Deleted",
      description: "URL has been deleted successfully",
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Links</p>
                <p className="text-2xl font-bold text-gray-900">{urls.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Links */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>My Links</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUrls.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {urls.length === 0 ? "No links created yet." : "No links match your search."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUrls.map((url) => (
                <div
                  key={url.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-blue-600">{url.shortUrl}</span>
                        <Badge variant="secondary">{url.clicks} clicks</Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{url.originalUrl}</p>
                      <p className="text-xs text-gray-400 mt-1">Created {formatDate(url.createdAt)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(url.shortUrl)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.open(url.shortUrl, "_blank")}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(url.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
      </Card>
    </div>
  )
}
