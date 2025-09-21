"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target } from "lucide-react"

const malaysianStates = [
  "Kuala Lumpur",
  "Selangor",
  "Penang",
  "Johor",
  "Perak",
  "Kedah",
  "Kelantan",
  "Terengganu",
  "Pahang",
  "Negeri Sembilan",
  "Melaka",
  "Sabah",
  "Sarawak",
  "Perlis",
  "Putrajaya",
  "Labuan",
]

const cultures = ["Chinese", "Malay", "Indian", "Iban", "Kadazan", "All"]

export function StepOne({ formData, setFormData, onNext }) {
  const handleCultureToggle = (culture) => {
    const updated = formData.targetedCulture.includes(culture)
      ? formData.targetedCulture.filter((c) => c !== culture)
      : [...formData.targetedCulture, culture]
    setFormData({ ...formData, targetedCulture: updated })
  }

  const isFormValid =
    formData.product &&
    formData.region &&
    formData.targetedCulture.length > 0 &&
    formData.audience &&
    formData.goal &&
    formData.duration

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Campaign Foundation</CardTitle>
        </div>
        <CardDescription>
          {"Tell us about your product and target market to create a personalized strategy"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product */}
          <div className="space-y-2">
            <Label htmlFor="product">Product/Service *</Label>
            <Input
              id="product"
              placeholder="e.g., Skincare serum, Food delivery app"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            />
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label htmlFor="region">Target Region *</Label>
            <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Malaysian state" />
              </SelectTrigger>
              <SelectContent>
                {malaysianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Targeted Culture */}
        <div className="space-y-3">
          <Label>Targeted Culture/Community *</Label>
          <div className="flex flex-wrap gap-2">
            {cultures.map((culture) => (
              <Badge
                key={culture}
                variant={formData.targetedCulture.includes(culture) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleCultureToggle(culture)}
              >
                {culture}
              </Badge>
            ))}
          </div>
        </div>

        {/* Audience */}
        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience *</Label>
          <Textarea
            id="audience"
            placeholder="e.g., Young professionals aged 25-35, interested in wellness and beauty"
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="goal">Campaign Goal *</Label>
            <Input
              id="goal"
              placeholder="e.g., Increase brand awareness, Drive sales, Build community"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Campaign Duration *</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="3 weeks">3 weeks</SelectItem>
                <SelectItem value="4 weeks">4 weeks</SelectItem>
                <SelectItem value="6 weeks">6 weeks</SelectItem>
                <SelectItem value="8 weeks">8 weeks</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seasonality">Seasonality/Occasions</Label>
          <Input
            id="seasonality"
            placeholder="e.g., Ramadan, Raya, Chinese New Year, Merdeka, Back-to-School"
            value={formData.seasonality.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, seasonality: e.target.value.split(", ").filter((s) => s.trim()) })
            }
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (RM)</Label>
          <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000-5000">RM 1,000 - 5,000</SelectItem>
              <SelectItem value="5000-15000">RM 5,000 - 15,000</SelectItem>
              <SelectItem value="15000-50000">RM 15,000 - 50,000</SelectItem>
              <SelectItem value="50000+">RM 50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Generate Strategy <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
