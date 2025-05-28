import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function ActivityChart() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    // Register plugin
    Chart.register(ChartDataLabels);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Pending", "Preparing", "Completed"],
        datasets: [
          {
            label: "Orders by Status",
            data: [20, 30, 100], // Replace with dynamic data
            backgroundColor: [
              "rgba(255, 159, 64, 0.8)", // iOS-like orange
              "rgba(0, 122, 255, 0.8)", // iOS system blue
              "rgba(52, 199, 89, 0.8)", // iOS system green
            ],
            borderColor: [
              "rgba(255, 159, 64, 1)",
              "rgba(0, 122, 255, 1)",
              "rgba(52, 199, 89, 1)",
            ],
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
            barThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Order Status Overview",
            color: "#1C2526",
            font: {
              size: 16,
              weight: "600",
              family:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            },
            padding: { top: 0, bottom: 12 },
          },
          tooltip: {
            backgroundColor: "rgba(28, 37, 38, 0.9)",
            titleFont: {
              size: 13,
              weight: "500",
              family:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            },
            bodyFont: {
              size: 12,
              family:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            },
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
          },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#1C2526",
            font: {
              family:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              weight: "600",
              size: 11,
            },
            formatter: (value) => `${value} orders`,
            padding: {
              top: 4,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
            ticks: {
              stepSize: 25,
              color: "rgba(28, 37, 38, 0.7)",
              font: {
                family:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                size: 11,
              },
              padding: 6,
            },
            title: {
              display: true,
              text: "Number of Orders",
              color: "rgba(28, 37, 38, 0.7)",
              font: {
                size: 12,
                weight: "500",
                family:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              },
              padding: { top: 0, bottom: 8 },
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "rgba(28, 37, 38, 0.7)",
              font: {
                family:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                size: 12,
                weight: "500",
              },
            },
            title: {
              display: true,
              text: "Order Status",
              color: "rgba(28, 37, 38, 0.7)",
              font: {
                size: 12,
                weight: "500",
                family:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              },
              padding: { top: 8, bottom: 0 },
            },
          },
        },
        layout: {
          padding: {
            top: 8,
            right: 16,
            bottom: 16,
            left: 16,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white/80 rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200 ease-out backdrop-blur-md border border-white/20 w-full h-[360px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
