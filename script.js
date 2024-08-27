document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.aladhan.com/v1/calendarByCity/2024/08?city=Colombo&country=Sri%20Lanka&method=3';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const today = new Date().getDate();
            const timings = data.data[today - 1].timings;

            const cleanTime = (time) => time.replace(/\s\(\+\d{4}\)/, '');

            document.getElementById('fajr-time').textContent = cleanTime(timings.Fajr);
            document.getElementById('dhuhr-time').textContent = cleanTime(timings.Dhuhr);
            document.getElementById('asr-time').textContent = cleanTime(timings.Asr);
            document.getElementById('maghrib-time').textContent = cleanTime(timings.Maghrib);
            document.getElementById('isha-time').textContent = cleanTime(timings.Isha);
            document.getElementById('date').textContent = `Today: ${data.data[today - 1].date.readable}`;

            // Countdown Logic
            const now = new Date();
            const times = [cleanTime(timings.Fajr), cleanTime(timings.Dhuhr), cleanTime(timings.Asr), cleanTime(timings.Maghrib), cleanTime(timings.Isha)];
            const nextPrayer = times.find(time => new Date(`${new Date().toDateString()} ${time}`).getTime() > now.getTime());
            
            if (nextPrayer) {
                const nextPrayerTime = new Date(`${new Date().toDateString()} ${nextPrayer}`);
                const diff = nextPrayerTime - now;

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                document.getElementById('countdown').textContent = `${hours} hours and ${minutes} minutes`;
            } else {
                document.getElementById('countdown').textContent = 'No upcoming prayers today';
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
            document.querySelector('.prayer-time-container').textContent = 'Error fetching prayer times.';
        });
});
