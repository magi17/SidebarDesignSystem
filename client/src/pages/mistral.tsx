import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function MistralPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/mistral?message=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResult(data.response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Mistral AI Chat</h1>

      <Card className="bg-black/40 border border-gray-800">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Enter your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !input}
              className="w-full"
            >
              {loading ? "Processing..." : "Send Message"}
            </Button>
          </form>

          {result && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Response:</h2>
              <p className="text-gray-400 whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
