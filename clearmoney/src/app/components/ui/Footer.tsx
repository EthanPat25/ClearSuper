import Link from "next/link";

export function Footer() {
  return (
    // CHANGED: bg-[#6d9e87] -> bg-emerald-950 (Anchors the page)
    // CHANGED: text-emerald-900 -> text-white (Base text color)
    <footer className="w-full bg-emerald-950 text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">
              ClearSuper
            </h3>
            {/* CHANGED: text-slate-400 -> text-emerald-100/70 (Softer white for readability) */}
            <p className="text-emerald-100/90 leading-relaxed text-sm">
              Making superannuation engaging and accessible to young Australians
              through visual tools and clear breakdowns.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* CHANGED: bg-emerald-700 -> bg-emerald-900 (Subtle contrast against dark footer) */}
              {/* Hover: bg-emerald-800 */}
              <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-all hover:scale-105">
                {/* Icon color: text-emerald-100 */}
                <svg
                  className="w-5 h-5 text-emerald-100"
                  fill="currentColor"
                  version="1.1"
                  id="fi_25657"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="438.536px"
                  height="438.536px"
                  viewBox="0 0 438.536 438.536"
                  enableBackground="new 0 0 438.536 438.536"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M158.173,352.599c-3.049,0.568-4.381,1.999-3.999,4.281c0.38,2.283,2.093,3.046,5.138,2.283
			c3.049-0.76,4.38-2.095,3.997-3.997C162.931,353.074,161.218,352.216,158.173,352.599z"
                      ></path>
                      <path
                        d="M141.898,354.885c-3.046,0-4.568,1.041-4.568,3.139c0,2.474,1.619,3.518,4.853,3.138c3.046,0,4.57-1.047,4.57-3.138
			C146.753,355.553,145.134,354.502,141.898,354.885z"
                      ></path>
                      <path
                        d="M119.629,354.022c-0.76,2.095,0.478,3.519,3.711,4.284c2.855,1.137,4.664,0.568,5.424-1.714
			c0.572-2.091-0.666-3.61-3.711-4.568C122.197,351.265,120.39,351.922,119.629,354.022z"
                      ></path>
                      <path
                        d="M414.41,24.123C398.326,8.042,378.964,0,356.309,0H82.225C59.577,0,40.208,8.042,24.123,24.123
			C8.042,40.207,0,59.576,0,82.225v274.088c0,22.65,8.042,42.017,24.123,58.098c16.084,16.084,35.454,24.126,58.102,24.126h63.953
			c4.184,0,7.327-0.144,9.42-0.424c2.092-0.288,4.184-1.526,6.279-3.717c2.096-2.187,3.14-5.376,3.14-9.562
			c0-0.568-0.05-7.046-0.144-19.417c-0.097-12.375-0.144-22.176-0.144-29.41l-6.567,1.143c-4.187,0.76-9.469,1.095-15.846,0.999
			c-6.374-0.096-12.99-0.76-19.841-1.998c-6.855-1.239-13.229-4.093-19.13-8.562c-5.898-4.477-10.085-10.328-12.56-17.559
			l-2.856-6.571c-1.903-4.373-4.899-9.229-8.992-14.554c-4.093-5.332-8.232-8.949-12.419-10.852l-1.999-1.428
			c-1.331-0.951-2.568-2.098-3.711-3.429c-1.141-1.335-1.997-2.669-2.568-3.997c-0.571-1.335-0.097-2.43,1.427-3.289
			c1.524-0.855,4.281-1.279,8.28-1.279l5.708,0.855c3.808,0.76,8.516,3.042,14.134,6.851c5.614,3.806,10.229,8.754,13.846,14.843
			c4.38,7.806,9.657,13.75,15.846,17.843c6.184,4.097,12.419,6.143,18.699,6.143s11.704-0.476,16.274-1.424
			c4.565-0.954,8.848-2.385,12.847-4.288c1.713-12.751,6.377-22.559,13.988-29.41c-10.848-1.143-20.602-2.854-29.265-5.14
			c-8.658-2.286-17.605-5.995-26.835-11.136c-9.234-5.14-16.894-11.512-22.985-19.13c-6.09-7.618-11.088-17.61-14.987-29.978
			c-3.901-12.375-5.852-26.652-5.852-42.829c0-23.029,7.521-42.637,22.557-58.814c-7.044-17.32-6.379-36.732,1.997-58.242
			c5.52-1.714,13.706-0.428,24.554,3.855c10.85,4.286,18.794,7.951,23.84,10.992c5.046,3.042,9.089,5.614,12.135,7.71
			c17.705-4.949,35.976-7.423,54.818-7.423c18.841,0,37.115,2.474,54.821,7.423l10.849-6.852c7.426-4.57,16.18-8.757,26.269-12.562
			c10.088-3.806,17.795-4.854,23.127-3.14c8.562,21.51,9.328,40.922,2.279,58.241c15.036,16.179,22.559,35.786,22.559,58.815
			c0,16.18-1.951,30.505-5.852,42.969c-3.898,12.467-8.939,22.463-15.13,29.981c-6.184,7.519-13.894,13.843-23.124,18.986
			c-9.232,5.137-18.178,8.853-26.84,11.132c-8.661,2.286-18.414,4.004-29.263,5.147c9.891,8.562,14.839,22.072,14.839,40.538v68.238
			c0,3.237,0.472,5.852,1.424,7.851c0.958,1.998,2.478,3.374,4.571,4.141c2.102,0.76,3.949,1.235,5.571,1.424
			c1.622,0.191,3.949,0.287,6.995,0.287h63.953c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102
			V82.225C438.533,59.576,430.491,40.204,414.41,24.123z"
                      ></path>
                      <path
                        d="M86.793,319.195c-1.331,0.948-1.141,2.471,0.572,4.565c1.906,1.902,3.427,2.189,4.57,0.855
			c1.331-0.948,1.141-2.471-0.575-4.569C89.458,318.336,87.936,318.049,86.793,319.195z"
                      ></path>
                      <path
                        d="M77.374,312.057c-0.57,1.335,0.096,2.478,1.999,3.426c1.521,0.955,2.762,0.767,3.711-0.568
			c0.57-1.335-0.096-2.478-1.999-3.433C79.182,310.91,77.945,311.102,77.374,312.057z"
                      ></path>
                      <path
                        d="M95.646,330.331c-1.715,0.948-1.715,2.666,0,5.137c1.713,2.478,3.328,3.142,4.853,1.998c1.714-1.334,1.714-3.142,0-5.427
			C98.978,329.571,97.359,328.993,95.646,330.331z"
                      ></path>
                      <path
                        d="M105.641,343.174c-1.714,1.526-1.336,3.327,1.142,5.428c2.281,2.279,4.185,2.566,5.708,0.849
			c1.524-1.519,1.143-3.326-1.142-5.42C109.068,341.751,107.164,341.463,105.641,343.174z"
                      ></path>
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>

              <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-all hover:scale-105">
                <svg
                  className="w-5 h-5 text-emerald-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {/* Note: changed text-slate-400 to text-emerald-100/70 */}
          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-emerald-50">
              Navigation
            </h4>
            <div className="space-y-3 text-sm">
              <div className="text-emerald-100/90 hover:text-white cursor-pointer transition-colors">
                View Your Fund
              </div>
              <div className="text-emerald-100/90 hover:text-white cursor-pointer transition-colors">
                Super Tools
              </div>
              <div className="text-emerald-100/90 hover:text-white cursor-pointer transition-colors">
                About
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-emerald-50">Tools</h4>
            <div className="space-y-3 text-sm">
              <div className="text-emerald-100/90 hover:text-white cursor-pointer transition-colors">
                <Link prefetch={false} href="/SuperGap">
                  Super Gap Calculator
                </Link>
              </div>
              <div className="text-emerald-100/90 hover:text-white cursor-pointer transition-colors">
                <Link prefetch={false} href="/FHSS">
                  FHSS vs Savings
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg text-emerald-50">
              About This Project
            </h4>
            <div className="space-y-3 text-sm">
              <div className="text-emerald-100/90">Educational Tools</div>
              <div className="text-emerald-100/90">Visual Learning</div>
              <div className="text-emerald-100/90">Super Made Simple</div>
              <div className="text-emerald-100/90">Young Australians</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom / Disclaimer */}
        <div className="border-t border-emerald-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="text-emerald-100/60 hover:text-white cursor-pointer transition-colors">
                GitHub Repository
              </div>
              <div className="text-emerald-100/60 hover:text-white cursor-pointer transition-colors">
                Documentation
              </div>
              <div className="text-emerald-100/60 hover:text-white cursor-pointer transition-colors">
                About Developer
              </div>
            </div>
            <div className="text-sm text-emerald-100/50">
              ClearSuper 2026 - Built for educational purposes.
            </div>
          </div>

          {/* Important Notice: Darker bg to sit nicely on the dark footer */}
          <div className="mt-8 p-6 bg-emerald-900/50 rounded-2xl border border-emerald-900">
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              <strong className="text-emerald-50">Important Notice:</strong>{" "}
              This is a student project created for educational and
              demonstration purposes only. While best effort has been made to
              provide accurate information and there will be continued effort to
              improve, there may be inaccuracies. This is not a licensed
              financial service and does not provide financial advice. All
              information is for educational purposes only. Always consult with
              licensed financial professionals before making superannuation
              decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
