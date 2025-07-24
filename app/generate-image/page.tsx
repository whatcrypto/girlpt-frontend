import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GenerateImagePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Generate AI Images</h1>
            <p className="text-xl text-muted-foreground">
              Create custom images for your AI companions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Image Generator</CardTitle>
                <CardDescription>
                  Describe what you want to generate and our AI will create it
                  for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Image Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the image you want to generate..."
                    className="min-h-[100px]"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Art Style</Label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose art style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Image Size</Label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose image size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="512x512">512x512</SelectItem>
                      <SelectItem value="768x768">768x768</SelectItem>
                      <SelectItem value="1024x1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" disabled>
                  Generate Image (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Your generated image will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-muted-foreground">
                      Generated image will appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📝</div>
                    <h3 className="font-semibold mb-2">1. Describe</h3>
                    <p className="text-sm text-muted-foreground">
                      Write a detailed description of the image you want to
                      create
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚙️</div>
                    <h3 className="font-semibold mb-2">2. Customize</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred art style and image dimensions
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">✨</div>
                    <h3 className="font-semibold mb-2">3. Generate</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI creates your custom image in seconds
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground">
              Image generation functionality is currently in development. Stay
              tuned for updates!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
