document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = '/.netlify/functions/prayer-times';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const timings = data.result.reduce((acc, curr) => {
                    switch (curr.vakit) {
                        case 'İmsak':
                            acc.Fajr = curr.saat;
                            break;
                        case 'Güneş':
                            acc.Sunrise = curr.saat;
                            break;
                        case 'Öğle':
                            acc.Dhuhr = curr.saat;
                            break;
                        case 'İkindi':
                            acc.Asr = curr.saat;
                            break;
                        case 'Akşam':
                            acc.Maghrib = curr.saat;
                            break;
                        case 'Yatsı':
                            acc.Isha = curr.saat;
                            break;
                        default:
                            break;
                    }
                    return acc;
                }, {});

                document.getElementById('fajr-time').textContent = timings.Fajr;
                document.getElementById('dhuhr-time').textContent = timings.Dhuhr;
                document.getElementById('asr-time').textContent = timings.Asr;
                document.getElementById('maghrib-time').textContent = timings.Maghrib;
                document.getElementById('isha-time').textContent = timings.Isha;

                // Countdown Logic
                const now = new Date();
                const times = [timings.Fajr, timings.Dhuhr, timings.Asr, timings.Maghrib, timings.Isha];
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
            } else {
                console.error('Error fetching prayer times:', data);
                document.querySelector('.prayer-time-container').textContent = 'Error fetching prayer times.';
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
            document.querySelector('.prayer-time-container').textContent = 'Error fetching prayer times.';
        });
});
