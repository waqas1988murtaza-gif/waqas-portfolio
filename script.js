document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMATED COUNTERS ---
    const stats = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounters = () => {
        stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            let currentFrame = 0;

            const updateCount = () => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                const currentVal = target * progress;
                
                if (currentFrame < totalFrames) {
                    stat.innerText = (target % 1 === 0 ? Math.floor(currentVal) : currentVal.toFixed(1)) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when stats column is visible
    const statsColumn = document.querySelector('.stats-column');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            startCounters();
            started = true;
        }
    }, { threshold: 0.2 });

    if (statsColumn) observer.observe(statsColumn);

    // --- SMOOTH SCROLLING (For internal links if any) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
