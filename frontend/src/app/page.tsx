import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-8 gap-8">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-700 drop-shadow-lg">
        ML Project
      </h1>
      <div className="flex gap-10">
        <Link href="/learn" className="flex flex-col items-center group">
          <div className="bg-blue-500 group-hover:bg-blue-700 transition rounded-full p-6 shadow-lg mb-2">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-blue-700 group-hover:text-blue-900">
            Learn (Upload CSV)
          </span>
        </Link>
        <Link href="/ask" className="flex flex-col items-center group">
          <div className="bg-green-500 group-hover:bg-green-700 transition rounded-full p-6 shadow-lg mb-2">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-green-700 group-hover:text-green-900">
            Ask (Query Model)
          </span>
        </Link>
      </div>
    </div>
  );
}
