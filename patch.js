const fs = require('fs');

let text = fs.readFileSync('index.html', 'utf-8');

const nav_old = `            </ul>
            <div class="hamburger">`;
const nav_new = `                <li class="nav-theme-toggle">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </button>
                </li>
            </ul>
            <div class="hamburger">`;
text = text.replace(nav_old, nav_new);

const title_old = '<h2 class="section-title">Mechanical Parts Shop</h2>';
const title_new = '<h2 class="section-title">Available Mechanical Parts</h2>';
text = text.replace(title_old, title_new);

text = text.replace(/\s*<div class="contact-form-wrapper">[\s\S]*?<\/div>(\s*<\/div>\s*<\/div>\s*<\/section>)/g, '$1');

text = text.replace(/<p class="part-price">.*?<\/p>/g, (match) => {
    const btn = `
                    <a href="https://www.facebook.com/jay.villareal.9047/" target="_blank" class="btn-part-contact">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.9 1.432 5.485 3.682 7.155v3.425l3.376-1.859c.928.261 1.91.404 2.942.404 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.093 12.35l-2.825-3.02-5.5 3.02 6.035-6.42 2.89 3.02 5.435-3.02-6.035 6.42z"/></svg> 
                        Message Jay
                    </a>`;
    return match + btn;
});

fs.writeFileSync('index.html', text, 'utf-8');

fs.appendFileSync('styles.css', `

/* Dark Mode Overrides */
[data-theme="dark"] {
    --bg-light: #0B1120;
    --bg-white: #0F172A;
    --text-dark: #F8FAFC;
    --text-muted: #94A3B8;
    --border-soft: #1E293B;
    --glass-bg: rgba(15, 23, 42, 0.85);
    --glass-border: rgba(30, 41, 59, 0.5);
    --shadow-sm: 0 2px 4px rgb(0 0 0 / 0.2);
    --shadow-md: 0 4px 12px rgb(0 0 0 / 0.4);
    --shadow-lg: 0 12px 24px -4px rgb(0 0 0 / 0.5);
    --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.6);
}

/* Theme Toggle Button */
.nav-theme-toggle { display: flex; align-items: center; justify-content: center; margin-left: auto; }
.theme-toggle {
    background: transparent; border: none; color: var(--text-dark); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 8px; border-radius: 50%; transition: var(--transition);
}
.theme-toggle:hover { background: var(--border-soft); color: var(--primary); }
.theme-toggle svg { width: 22px; height: 22px; stroke-width: 2.5; }

/* Messenger Button on Parts */
.btn-part-contact {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 16px; padding: 10px; border-radius: var(--radius-sm);
    background: rgba(59, 130, 246, 0.1); color: #3B82F6;
    text-decoration: none; font-weight: 600; font-size: 0.95rem; font-family: var(--font-body);
    transition: var(--transition); border: 1px solid rgba(59, 130, 246, 0.2);
}
.btn-part-contact:hover {
    background: #3B82F6; color: var(--bg-white); transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); border-color: #3B82F6;
}

/* Fix Contact layout since form is removed */
.contact-grid { display: block; max-width: 1000px; margin: 0 auto; }
.contact-info { flex-direction: row; flex-wrap: wrap; justify-content: center; }
.contact-card { flex: 1 1 250px; }

@media (max-width: 768px) {
    .nav-theme-toggle { margin-left: 0; }
    .contact-info { flex-direction: column; }
}
`, 'utf-8');

let js_text = fs.readFileSync('script.js', 'utf-8');

js_text = js_text.replace(/\/\/ Contact form submission[\s\S]*?\}\n    \}\n/g, '');

const dark_mode_logic = `
    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(sunIcon) sunIcon.style.display = 'none';
        if(moonIcon) moonIcon.style.display = 'block';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }
`;

js_text += dark_mode_logic;

fs.writeFileSync('script.js', js_text, 'utf-8');

console.log("Patch applied successfully!");
