// app/page.js
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/calculator">
              Go to Calculator
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
