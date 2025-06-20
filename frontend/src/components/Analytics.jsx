import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Globe, Calendar } from "lucide-react"

export function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalClicks: 0,
    totalLinks: 0,
    topPerforming: [],
    recentActivity: [],
  })

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")

    const urlsWithClicks = savedUrls.map((url) => ({
      ...url,
      clicks: url.clicks || Math.floor(Math.random() * 100),
    }))

    const recentActivity = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clicks: Math.floor(Math.random() * 50),
    })).reverse()

    const totalClicks = urlsWithClicks.reduce((sum, url) => sum + (url.clicks || 0), 0)
    const topPerforming = urlsWithClicks
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 5)

    setAnalytics({
      totalClicks,
      totalLinks: urlsWithClicks.length,
      topPerforming,
      recentActivity,
    })
  }, [])

  const formatUrl = (url) => {
    return url.length > 50 ? url.substring(0, 50) + "..." : url
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalClicks}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Links</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalLinks}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Daily Clicks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(analytics.recentActivity.reduce((sum, d) => sum + d.clicks, 0) / 7)}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.recentActivity.reduce((sum, d) => sum + d.clicks, 0)}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((day, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.clicks / 50) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{day.clicks}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Performing Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topPerforming.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No links available</p>
            ) : (
              <div className="space-y-4">
                {analytics.topPerforming.map((url, i) => (
                  <div key={url.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-600">#{i + 1}</span>
                        <span className="text-sm font-medium">{url.shortCode}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">{formatUrl(url.originalUrl)}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {url.clicks} clicks
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {analytics.totalLinks > 0
                  ? Math.round(analytics.totalClicks / analytics.totalLinks)
                  : 0}
              </div>
              <p className="text-sm text-gray-600">Average clicks per link</p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {analytics.topPerforming.length > 0 ? analytics.topPerforming[0]?.clicks || 0 : 0}
              </div>
              <p className="text-sm text-gray-600">Best performing link</p>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {analytics.recentActivity.length > 0
                  ? Math.max(...analytics.recentActivity.map((d) => d.clicks))
                  : 0}
              </div>
              <p className="text-sm text-gray-600">Peak daily clicks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
