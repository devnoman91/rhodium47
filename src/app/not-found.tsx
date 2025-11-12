import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1F2]">
      <div className="text-center px-6">
        <h1 className="text-[64px] font-medium text-black mb-4">404</h1>
        <h2 className="text-[32px] font-medium text-black mb-6">Page Not Found</h2>
        <p className="text-[18px] text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-[#560100] text-white rounded-full font-medium hover:bg-[#6a0100] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
