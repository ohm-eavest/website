import '../app/ui/global.css';


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
            <head>
                {/* Load Taviraj Thin font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Taviraj:wght@100&display=swap"
                    rel="stylesheet"
                />
                {/* Load DM Sans font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
            <link
                href="https://fonts.googleapis.com/css2?family=Taviraj:wght@100&display=swap"
                rel="stylesheet"
            />
            {/* Load DM Sans font */}
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap"
                rel="stylesheet"
            />
            {children}
            </body>
        </html>
    )
}