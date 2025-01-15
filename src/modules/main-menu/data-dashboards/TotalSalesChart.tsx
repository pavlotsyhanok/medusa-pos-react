import React, { useEffect, useRef } from 'react'

function TotalSalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Load Chart.js from CDN
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.async = true
    script.onload = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d')
        
        if (ctx) {
          // Generate days 1-30
          const days = Array.from({length: 30}, (_, i) => i + 1)

          // Generate sample data
          const currentMonthData = Array.from({length: 30}, () => 
            Math.floor(Math.random() * 100) + 50
          )
          
          const previousMonthData = Array.from({length: 30}, () =>
            Math.floor(Math.random() * 100) + 50
          )

          // @ts-ignore - Chart will be available after script loads
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: days,
              datasets: [
                {
                  label: 'Current Month Sales',
                  data: currentMonthData,
                  fill: true,
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.1)',
                  tension: 0.4,
                  borderWidth: 2,
                  pointRadius: 0 // Remove points
                },
                {
                  label: 'Previous Month Sales',
                  data: previousMonthData,
                  fill: true,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.1)',
                  tension: 0.4,
                  borderWidth: 2,
                  pointRadius: 0 // Remove points
                }
              ]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: false,
                    text: 'Sales Amount'
                  }
                },
                x: {
                  title: {
                    display: false,
                    text: 'Day'
                  }
                }
              },
              elements: {
                line: {
                  tension: 0.4
                }
              }
            }
          })
        }
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  )
}

export default TotalSalesChart