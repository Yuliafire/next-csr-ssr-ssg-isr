# Next.js Rendering Modes Demo

A Next.js application demonstrating different rendering strategies—Client-Side Rendering (CSR), Static Site Generation (SSG), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR)—using the App Router. This project showcases how to build dynamic and static pages with real-time data fetching from the JSONPlaceholder API.

## Features
- **Home Page (/)**: Uses CSR with `useSWR` to fetch and display a list of users, featuring a modal with a form for POST requests.
- **Static Page (/static)**: Pre-rendered SSG page showing a static user list.
- **Server Page (/server)**: SSR page fetching fresh user data on each request.
- **ISR Page (/isr)**: Statically generated with 1-minute revalidation for periodic updates.
- **Animations**: Integrates `framer-motion` for smooth UI transitions.
- **Notifications**: Uses `react-hot-toast` for user feedback.
- **Form Handling**: Includes a `Form.tsx` component with file upload support.

## Tech Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
1. Clone the repository:
   git clone https://github.com/yuliafire/next-csr-ssr-ssg-isr.git
   cd next-csr-ssr-ssg-isr
   

2. Install dependencies:
``` npm install ```

3. Run the development server
``` npm run dev ```

4. build the app:
``` npm run build ```

