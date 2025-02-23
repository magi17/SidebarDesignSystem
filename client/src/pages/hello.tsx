import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface HelloResponse {
  message: string;
  timestamp: string;
}

export default function HelloPage() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load hello message",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHello();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Hello API</h1>

      <Card className="bg-black/40 border border-gray-800">
        <CardContent className="pt-6">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : data ? (
            <div className="space-y-4">
              <p className="text-white">{data.message}</p>
              <p className="text-gray-400">Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-red-400">Failed to load data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
