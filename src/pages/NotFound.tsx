
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, FileSearch } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularTools = [
    { name: "Merge PDF", path: "/merge-pdf" },
    { name: "Split PDF", path: "/split-pdf" },
    { name: "Compress PDF", path: "/compress-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <FileSearch className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page may have been moved, deleted, or never existed. 
          Check the URL or try one of our popular tools below.
        </p>
        
        <div className="flex flex-col space-y-4 mb-8">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tools">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Browse All Tools
            </Link>
          </Button>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Popular Tools:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 text-sm rounded-full border transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
