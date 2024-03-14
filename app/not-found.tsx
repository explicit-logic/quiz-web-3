export default function NotFound() {
  return (
    <>
      <head></head>
      <body className="bg-black text-white">
        <div style={{
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
        }>
          <div>
            <h1 className="next-error-h1"
              style={{
                textAlign: 'center',
                borderRight: '1px solid rgba(255,255,255,.3)',
                display: 'inline-block',
                margin: '0 20px 0 0',
                padding: '0 23px 0 0',
                fontSize: '24px',
                fontWeight: 500,
                verticalAlign: 'top',
                lineHeight: '49px',
              }}
            >
                404
            </h1>
            <div style={{display: 'inline-block'}}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '49px',
                margin: 0,
              }}>This page could not be found.</h2>
            </div></div>
        </div>
      </body>
    </>
  );
}
