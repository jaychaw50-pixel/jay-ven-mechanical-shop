const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const nav_orig = `                <li class="nav-theme-toggle">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </button>
                </li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>`;

const nav_fixed = `            </ul>
            <div class="nav-controls">
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>`;

html = html.replace(nav_orig, nav_fixed);
fs.writeFileSync('index.html', html, 'utf-8');

let css = fs.readFileSync('styles.css', 'utf-8');

// Replace all explicitly "var(--bg-white)" TEXT colors with "#FFFFFF"
const elementsWithWhiteText = [
    /color:\s*var\(--bg-white\);/g
];
css = css.replace(/color:\s*var\(--bg-white\);/g, 'color: #FFFFFF;');

// Update .nav-links margin to leave space for nav-controls and remove background
css = css.replace('.nav-links { display: flex; list-style: none; gap: 36px; }', '.nav-links { display: flex; list-style: none; gap: 36px; margin-right: 20px; }');

// Add .nav-controls definition
const navControlsCSS = `
.nav-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
}
@media (max-width: 768px) {
    .nav-links { margin-right: 0; }
    .theme-toggle { padding: 4px; }
}
`;
css += navControlsCSS;

fs.writeFileSync('styles.css', css, 'utf-8');

console.log("HTML and CSS patched successfully.");
