// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages folder is what determines file structure and defines routes for the application
// api directory is for server-only routes and that will only apply to the server

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
