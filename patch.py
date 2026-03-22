import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Navbar dark mode toggle
nav_old = """            </ul>
            <div class="hamburger">"""
nav_new = """                <li class="nav-theme-toggle">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </button>
                </li>
            </ul>
            <div class="hamburger">"""
text = text.replace(nav_old, nav_new)

# 2. Parts title
title_old = '<h2 class="section-title">Mechanical Parts Shop</h2>'
title_new = '<h2 class="section-title">Available Mechanical Parts</h2>'
text = text.replace(title_old, title_new)

# 3. Contact Form removal
form_wrapper_pattern = r'\s*<div class="contact-form-wrapper">.*?</div>\s*</div>\s*</div>\s*</section>'
replacement = '\n            </div>\n        </div>\n    </section>'
text = re.sub(form_wrapper_pattern, replacement, text, flags=re.DOTALL)

# 4. Messenger links on parts
def add_messenger(match):
    price_tag = match.group(0)
    btn = """
                    <a href="https://www.facebook.com/jay.villareal.9047/" target="_blank" class="btn-part-contact">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.9 1.432 5.485 3.682 7.155v3.425l3.376-1.859c.928.261 1.91.404 2.942.404 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.093 12.35l-2.825-3.02-5.5 3.02 6.035-6.42 2.89 3.02 5.435-3.02-6.035 6.42z"/></svg> 
                        Message Jay
                    </a>"""
    return price_tag + btn

text = re.sub(r'<p class="part-price">.*?</p>', add_messenger, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

with open('styles.css', 'a+', encoding='utf-8') as f:
    f.write("""

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
""")

with open('script.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

# remove contact form submit event
js_text = re.sub(r'// Contact form submission.*?}\n    }\n', '', js_text, flags=re.DOTALL)

# inject dark mode toggle logic
dark_mode_logic = """
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
"""

js_text += dark_mode_logic

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_text)

print("Patch applied successfully!")
