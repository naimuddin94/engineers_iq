import { FileX } from "lucide-react";

function ArticleNotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center text-center space-y-4">
      <FileX className="w-16 h-16 text-gray-400" />
      <h1 className="text-2xl font-semibold text-gray-600">
        No articles found!
      </h1>
      <p className="text-gray-500">
        Try searching for something else or check back later.
      </p>
    </div>
  );
}

export default ArticleNotFound;
