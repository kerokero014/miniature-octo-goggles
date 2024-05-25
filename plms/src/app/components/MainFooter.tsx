import Link from 'next/link';

export default function MainFooter() {
  return (
    <footer className="fixed bottom-0 w-full px-6 py-4 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg">Your Company</h3>
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
        <div>
          <Link href="/contact" className="mr-4 text-sm text-gray-300 hover:text-white">
            Contact Us
          </Link>
          <Link href="/privacy" className="mr-4 text-sm text-gray-300 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="mr-4 text-sm text-gray-300 hover:text-white">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
