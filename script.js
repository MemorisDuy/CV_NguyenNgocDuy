document.addEventListener('DOMContentLoaded', () => {
    // Animation cho skill bars - giữ nguyên
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.classList.contains('html-skill') ? '95%' :
                           bar.classList.contains('css-skill') ? '90%' :
                           bar.classList.contains('js-skill') ? '85%' :
                           bar.classList.contains('react-skill') ? '80%' :
                           '85%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });

    // Xử lý nút Download CV
    const downloadBtn = document.querySelector('.download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Tạo dialog hướng dẫn
            const instructionDialog = document.createElement('div');
            instructionDialog.style.position = 'fixed';
            instructionDialog.style.top = '0';
            instructionDialog.style.left = '0';
            instructionDialog.style.width = '100%';
            instructionDialog.style.height = '100%';
            instructionDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            instructionDialog.style.display = 'flex';
            instructionDialog.style.justifyContent = 'center';
            instructionDialog.style.alignItems = 'center';
            instructionDialog.style.zIndex = '9999';
            
            instructionDialog.innerHTML = `
                <div style="background-color: white; max-width: 500px; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <h3 style="margin-top: 0; color: #0f172a; font-size: 20px; margin-bottom: 15px;">Lưu CV thành PDF</h3>
                    <p style="color: #334155; margin-bottom: 10px;">Để lưu CV với đầy đủ màu sắc và không bị cắt:</p>
                    
                    <ol style="color: #334155; text-align: left; margin-bottom: 20px; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Nhấn <strong>"In ngay"</strong> để mở cửa sổ in</li>
                        <li style="margin-bottom: 8px;">Chọn <strong>"Microsoft Print to PDF"</strong> trong danh sách máy in</li>
                        <li style="margin-bottom: 8px;">Mở mục <strong>"Thêm thiết lập"</strong> hoặc <strong>"More settings"</strong></li>
                        <li style="margin-bottom: 8px;">Bật tùy chọn <strong>"Hình nền"</strong> hoặc <strong>"Background graphics"</strong></li>
                        <li style="margin-bottom: 8px;">Đảm bảo <strong>"Định hướng: Dọc"</strong> và <strong>"Khổ giấy: A4"</strong></li>
                        <li style="margin-bottom: 8px;">Tắt <strong>"Tiêu đề & chân trang"</strong> nếu có</li>
                        <li style="margin-bottom: 8px;">Nhấn nút <strong>"In"</strong> hoặc <strong>"Save"</strong></li>
                    </ol>
                    
                    <div style="display: flex; justify-content: flex-end; gap: 15px;">
                        <button id="cancel-print" style="padding: 10px 20px; border: none; background: #e2e8f0; color: #64748b; border-radius: 5px; cursor: pointer;">Hủy</button>
                        <button id="proceed-print" style="padding: 10px 25px; border: none; background: linear-gradient(135deg, #3b82f6, #f97316); color: white; border-radius: 5px; font-weight: 500; cursor: pointer;">In ngay</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(instructionDialog);
            
            // Xử lý sự kiện
            document.getElementById('cancel-print').addEventListener('click', () => {
                document.body.removeChild(instructionDialog);
            });
            
            document.getElementById('proceed-print').addEventListener('click', () => {
                // Đảm bảo skill bars đã hoàn tất
                skillBars.forEach(bar => {
                    if (bar.classList.contains('html-skill')) bar.style.width = '95%';
                    else if (bar.classList.contains('css-skill')) bar.style.width = '90%';
                    else if (bar.classList.contains('js-skill')) bar.style.width = '85%';
                    else if (bar.classList.contains('react-skill')) bar.style.width = '80%';
                    else bar.style.width = '85%';
                });
                
                // Thêm style tạm thời để tối ưu hóa cho in
                const tempPrintStyle = document.createElement('style');
                tempPrintStyle.id = 'temp-print-style';
                tempPrintStyle.textContent = `
                    @media print {
                        @page { size: A4 portrait; margin: 0; }
                        html, body { margin: 0 !important; padding: 0 !important; }
                        
                        .container {
                            transform: scale(0.95) !important;
                            transform-origin: top center !important;
                        }
                        
                        /* Cố gắng hiển thị toàn bộ nội dung trên một trang */
                        .sidebar, .main-content {
                            overflow: visible !important;
                        }
                    }
                `;
                document.head.appendChild(tempPrintStyle);
                
                // Ẩn dialog
                document.body.removeChild(instructionDialog);
                
                // Thêm class in vào container
                const container = document.querySelector('.container');
                container.classList.add('printing');
                
                // Ẩn tạm thời nút download
                const downloadBtnOriginalDisplay = downloadBtn.style.display;
                downloadBtn.style.display = 'none';
                
                // Chờ một chút để CSS được áp dụng
                setTimeout(() => {
                    // In
                    window.print();
                    
                    // Dọn dẹp sau khi in
                    setTimeout(() => {
                        // Xóa class in
                        container.classList.remove('printing');
                        
                        // Hiện lại nút download
                        downloadBtn.style.display = downloadBtnOriginalDisplay;
                        
                        // Xóa style tạm thời
                        const tempStyle = document.getElementById('temp-print-style');
                        if (tempStyle) {
                            tempStyle.parentNode.removeChild(tempStyle);
                        }
                    }, 1000);
                }, 300);
            });
        });
    } else {
        console.error('Download button not found!');
    }
});