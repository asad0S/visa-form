// تابع بارگذاری عکس پروفایل
function loadPhoto(event) {
    const img = document.getElementById('preview');
    const placeholder = document.querySelector('.photo-placeholder');
    
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.display = "block";
            if (placeholder) {
                placeholder.style.display = "none";
            }
        };
        reader.readAsDataURL(event.target.files[0]);
        
        const uploadBtn = document.querySelector('.upload-btn');
        uploadBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تغییر عکس پروفایل';
    }
}

// تابع بارگذاری تصویر پاسپورت
function loadPassport(event) {
    const img = document.getElementById('passportPreview');
    const placeholder = document.getElementById('passportPlaceholder');
    const uploadArea = document.getElementById('passportUploadArea');
    const actions = document.getElementById('passportActions');
    
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.display = "block";
            if (placeholder) {
                placeholder.style.display = "none";
            }
            actions.style.display = "flex";
            uploadArea.style.borderColor = "var(--accent-green)";
            uploadArea.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}

// تابع بارگذاری تصویر تذکره
function loadIdCard(event) {
    const img = document.getElementById('idCardPreview');
    const placeholder = document.getElementById('idCardPlaceholder');
    const uploadArea = document.getElementById('idCardUploadArea');
    const actions = document.getElementById('idCardActions');
    
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.display = "block";
            if (placeholder) {
                placeholder.style.display = "none";
            }
            actions.style.display = "flex";
            uploadArea.style.borderColor = "var(--accent-green)";
            uploadArea.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}

// تابع نمایش تصویر در مودال
function showImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modal.style.display = "block";
    
    // جلوگیری از اسکرول صفحه اصلی هنگام نمایش مودال
    document.body.style.overflow = "hidden";
}

// تابع بستن مودال
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// تابع تنظیم خودکار ارتفاع فیلدها
function autoExpand(field) {
    field.style.height = 'auto';
    const newHeight = Math.min(Math.max(field.scrollHeight, 45), 200);
    field.style.height = newHeight + 'px';
}

// تابع escape برای HTML
function escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// تابع ایجاد نام فایل بر اساس اطلاعات مشتری
function generateFileName(formData) {
    let fileName = 'فرم';
    
    // اضافه کردن شماره پاسپورت
    if (formData.trackingCode && formData.trackingCode.trim() !== '') {
        fileName += '-' + formData.trackingCode;
    }
    
    // اضافه کردن نام و فامیلی
    if (formData.nameFa && formData.nameFa.trim() !== '') {
        fileName += '-' + formData.nameFa;
    }
    
    if (formData.familyFa && formData.familyFa.trim() !== '') {
        fileName += '-' + formData.familyFa;
    }
    
    // حذف کاراکترهای نامناسب برای نام فایل
    fileName = fileName
        .replace(/[\\/:*?"<>|]/g, '-')  // حذف کاراکترهای ممنوعه
        .replace(/\s+/g, '-')           // جایگزینی فاصله با خط تیره
        .replace(/--+/g, '-')           // حذف خط تیره‌های تکراری
        .replace(/^-+|-+$/g, '');       // حذف خط تیره از ابتدا و انتها
    
    // اگر نام فایل خالی است، از نام پیش‌فرض استفاده کن
    if (fileName === 'فرم' || fileName === '') {
        fileName = 'فرم-اطلاعات-هویتی';
    }
    
    return fileName + '.html';
}

// تابع اعتبارسنجی فیلد
function validateField(field) {
    if (field.value.trim()) {
        field.classList.remove('error-border');
        field.classList.add('success-border');
    }
}

// تابع اعتبارسنجی کامل فرم
function validateForm() {
    let isValid = true;
    const requiredFields = ['trackingCode', 'nameFa', 'familyFa', 'fatherName'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error-border');
            isValid = false;
        }
    });
    
    return isValid;
}

// تابع نمایش پیام
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: ' + 
        (type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6') + 
        '; color: white; padding: 15px 25px; border-radius: 8px; z-index: 99999; font-family: Vazirmatn; font-size: 14px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.2); opacity: 0; transition: opacity 0.3s;';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// تابع پاک کردن کامل فرم
function clearForm() {
    if (!confirm('آیا از پاک کردن تمامی فیلدهای فرم و مدارک آپلود شده اطمینان دارید؟')) {
        return;
    }
    
    // پاک کردن فیلدهای فرم
    const inputs = document.querySelectorAll('.form-input, .code-input');
    inputs.forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = '';
            input.style.height = 'auto';
            input.classList.remove('success-border', 'error-border');
        }
    });
    
    // پاک کردن عکس پروفایل
    const img = document.getElementById('preview');
    const placeholder = document.querySelector('.photo-placeholder');
    img.style.display = "none";
    img.src = "";
    placeholder.style.display = "block";
    
    const uploadBtn = document.querySelector('.upload-btn');
    uploadBtn.innerHTML = '<i class="fas fa-upload"></i> انتخاب عکس پروفایل';
    document.getElementById('photo-upload').value = "";
    
    // پاک کردن تصویر پاسپورت
    const passportImg = document.getElementById('passportPreview');
    const passportPlaceholder = document.getElementById('passportPlaceholder');
    const passportActions = document.getElementById('passportActions');
    const passportUploadArea = document.getElementById('passportUploadArea');
    
    passportImg.style.display = "none";
    passportImg.src = "";
    passportPlaceholder.style.display = "flex";
    passportActions.style.display = "none";
    passportUploadArea.style.borderColor = "#cbd5e0";
    passportUploadArea.style.backgroundColor = "transparent";
    document.getElementById('passportUpload').value = "";
    
    // پاک کردن تصویر تذکره
    const idCardImg = document.getElementById('idCardPreview');
    const idCardPlaceholder = document.getElementById('idCardPlaceholder');
    const idCardActions = document.getElementById('idCardActions');
    const idCardUploadArea = document.getElementById('idCardUploadArea');
    
    idCardImg.style.display = "none";
    idCardImg.src = "";
    idCardPlaceholder.style.display = "flex";
    idCardActions.style.display = "none";
    idCardUploadArea.style.borderColor = "#cbd5e0";
    idCardUploadArea.style.backgroundColor = "transparent";
    document.getElementById('idCardUpload').value = "";
    
    showToast('تمامی فیلدهای فرم و مدارک پاک شدند', 'success');
}

// تابع ایجاد HTML فقط خواندنی با مدارک (بهینه شده)
function createReadOnlyHTML(formData, hasProfilePhoto, profilePhotoBase64, hasPassport, passportBase64, hasIdCard, idCardBase64) {
    // ایجاد کد HTML
    const html = `<!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>فرم - ${escapeHTML(formData.nameFa || '')} ${escapeHTML(formData.familyFa || '')}</title>
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background: #f5f7fa;
                padding: 20px;
                font-family: 'Vazirmatn', Tahoma, sans-serif;
                color: #1a202c;
                line-height: 1.6;
            }
            
            .readonly-form {
                max-width: 1000px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            
            .form-header {
                background: linear-gradient(135deg, #2c5aa0 0%, #1e3f7a 100%);
                color: white;
                padding: 25px 30px;
                text-align: center;
            }
            
            .form-header h1 {
                font-size: 28px;
                margin-bottom: 8px;
                font-weight: 800;
            }
            
            .form-header .subtitle {
                font-size: 16px;
                opacity: 0.95;
            }
            
            .photo-section {
                padding: 25px 30px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                text-align: center;
            }
            
            .photo-container {
                width: 200px;
                height: 240px;
                border: 3px solid #cbd5e0;
                background: white;
                display: inline-block;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 15px;
            }
            
            .photo-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .photo-container img:hover {
                transform: scale(1.05);
            }
            
            .no-photo {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #718096;
                font-size: 14px;
            }
            
            .tracking-section {
                padding: 20px 30px;
                background: white;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .tracking-container {
                background: #f0f9ff;
                border: 2px solid #bae6fd;
                padding: 18px 25px;
                border-radius: 8px;
                max-width: 600px;
                margin: 0 auto;
            }
            
            .code-label {
                font-size: 16px;
                color: #1e3f7a;
                font-weight: 700;
                margin-bottom: 10px;
                text-align: center;
            }
            
            .code-value {
                font-size: 20px;
                font-weight: 700;
                font-family: 'Courier New', monospace;
                text-align: center;
                color: #1a202c;
                letter-spacing: 2px;
                padding: 10px;
                background: white;
                border-radius: 6px;
                border: 2px solid #cbd5e0;
            }
            
            .form-content {
                padding: 25px 30px;
            }
            
            .info-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 15px;
            }
            
            .info-table td {
                border: 1px solid #e2e8f0;
                padding: 16px 18px;
                vertical-align: top;
            }
            
            .label-col {
                width: 25%;
                background: #edf2f7;
                text-align: right;
                color: #2d3748;
                border-right: 2px solid #cbd5e0;
                font-weight: 700;
                font-size: 14px;
            }
            
            .value-col {
                width: 40%;
                text-align: right;
                font-weight: 600;
                color: #1a202c;
                font-size: 15px;
            }
            
            .value-col-english {
                width: 35%;
                text-align: left;
                direction: ltr;
                font-family: 'Roboto', Arial, sans-serif;
                font-weight: 600;
                color: #1a202c;
                font-size: 15px;
            }
            
            .value-col-full {
                width: 75%;
                text-align: right;
                font-weight: 600;
                color: #1a202c;
                font-size: 15px;
            }
            
            .address-value {
                white-space: pre-line;
                line-height: 1.8;
            }
            
            /* استایل بخش مدارک */
            .documents-section {
                padding: 25px 30px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
            }
            
            .documents-title {
                font-size: 20px;
                color: #1e3f7a;
                margin-bottom: 25px;
                text-align: center;
            }
            
            .documents-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 25px;
            }
            
            .document-card {
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                border: 1px solid #e2e8f0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .document-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            
            .document-header {
                background: #edf2f7;
                padding: 15px 20px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .document-header h3 {
                font-size: 16px;
                color: #1e3f7a;
                margin-bottom: 5px;
            }
            
            .document-header p {
                font-size: 13px;
                color: #4a5568;
            }
            
            .document-image {
                padding: 20px;
                text-align: center;
            }
            
            .document-image img {
                max-width: 100%;
                max-height: 300px;
                object-fit: contain;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .document-image img:hover {
                transform: scale(1.03);
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            }
            
            .no-document {
                padding: 40px 20px;
                text-align: center;
                color: #718096;
                font-size: 14px;
            }
            
            /* مودال نمایش تصویر */
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                overflow: auto;
            }
            
            .modal-content {
                position: relative;
                margin: 50px auto;
                padding: 20px;
                width: 90%;
                max-width: 800px;
                background: white;
                border-radius: 12px;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                left: 20px;
                color: #aaa;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1001;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0,0,0,0.1);
                border-radius: 50%;
            }
            
            .close-modal:hover {
                color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
            }
            
            .modal-image {
                width: 100%;
                max-height: 70vh;
                object-fit: contain;
                border-radius: 8px;
                margin: 20px 0;
            }
            
            .modal-footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
            }
            
            .modal-close-btn {
                background: linear-gradient(to right, #6b7280, #4b5563);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Vazirmatn', sans-serif;
                font-size: 14px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            
            @media print {
                body {
                    padding: 0;
                    background: white;
                }
                
                .readonly-form {
                    box-shadow: none;
                    border-radius: 0;
                }
                
                .documents-section {
                    page-break-inside: avoid;
                }
            }
            
            @media (max-width: 768px) {
                body {
                    padding: 10px;
                }
                
                .form-header h1 {
                    font-size: 22px;
                }
                
                .photo-container {
                    width: 150px;
                    height: 180px;
                }
                
                .info-table td {
                    padding: 12px 14px;
                    font-size: 14px;
                }
                
                .label-col, .value-col, .value-col-english, .value-col-full {
                    font-size: 13px;
                }
                
                .documents-container {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="readonly-form">
            <!-- هدر فرم -->
            <div class="form-header">
                <h1>شرکت سیاحتی رستگاران</h1>
            </div>
            
            <!-- بخش عکس پروفایل -->
            <div class="photo-section">
                <div class="photo-container">
                    ${hasProfilePhoto ? `<img src="${profilePhotoBase64}" alt="عکس پروفایل" class="clickable-image" onclick="showModalImage(this.src)">` : '<div class="no-photo">عکس پروفایل آپلود نشده است</div>'}
                </div>
            </div>
            
            <!-- کد رهگیری -->
            <div class="tracking-section">
                <div class="tracking-container">
                    <div class="code-label">شماره پاسپورت</div>
                    <div class="code-value">${escapeHTML(formData.trackingCode || 'ثبت نشده')}</div>
                </div>
            </div>
            
            <!-- اطلاعات فرم -->
            <div class="form-content">
                <table class="info-table">
                    <!-- اسم -->
                    <tr>
                        <td class="label-col">اسم فارسی و انگلیسی</td>
                        <td class="value-col">${escapeHTML(formData.nameFa || 'ثبت نشده')}</td>
                        <td class="value-col-english">${escapeHTML(formData.nameEn || 'Not entered')}</td>
                    </tr>
                    
                    <!-- تخلص -->
                    <tr>
                        <td class="label-col">تخلص فارسی و انگلیسی</td>
                        <td class="value-col">${escapeHTML(formData.familyFa || 'ثبت نشده')}</td>
                        <td class="value-col-english">${escapeHTML(formData.familyEn || 'Not entered')}</td>
                    </tr>
                    
                    <!-- نام پدر -->
                    <tr>
                        <td class="label-col">نام پدر</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.fatherName || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- نام پدر کلان -->
                    <tr>
                        <td class="label-col">نام پدر کلان</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.grandfatherName || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- نام مادر -->
                    <tr>
                        <td class="label-col">نام مادر</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.motherName || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- آدرس افغانستان -->
                    <tr>
                        <td class="label-col">آدرس افغانستان</td>
                        <td class="value-col-full address-value" colspan="2">${escapeHTML(formData.afghanAddress || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- شماره تماس -->
                    <tr>
                        <td class="label-col">شماره تماس</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.phoneNumber || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- آدرس ایران -->
                    <tr>
                        <td class="label-col">آدرس ایران</td>
                        <td class="value-col-full address-value" colspan="2">${escapeHTML(formData.iranAddress || 'ثبت نشده')}</td>
                    </tr>
                    
                    <!-- سفارت ایران -->
                    <tr>
                        <td class="label-col">سفارت ایران</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.iranConsulate)}</td>
                    </tr>
                    
                    <!-- شغل -->
                    <tr>
                        <td class="label-col">شغل</td>
                        <td class="value-col-full" colspan="2">${escapeHTML(formData.jobFa || 'ثبت نشده')}</td>
                    </tr>
                </table>
            </div>
            
            <!-- بخش مدارک -->
            <div class="documents-section">
                <h2 class="documents-title">مدارک آپلود شده</h2>
                
                <div class="documents-container">
                    <!-- پاسپورت -->
                    <div class="document-card">
                        <div class="document-header">
                            <h3>تصویر پاسپورت</h3>
                            <p>صفحه اصلی پاسپورت</p>
                        </div>
                        <div class="document-image">
                            ${hasPassport ? `<img src="${passportBase64}" alt="تصویر پاسپورت" class="clickable-image" onclick="showModalImage(this.src)">` : '<div class="no-document">تصویر پاسپورت آپلود نشده است</div>'}
                        </div>
                    </div>
                    
                    <!-- تذکره -->
                    <div class="document-card">
                        <div class="document-header">
                            <h3>تصویر تذکره</h3>
                            <p>صفحه اصلی تذکره</p>
                        </div>
                        <div class="document-image">
                            ${hasIdCard ? `<img src="${idCardBase64}" alt="تصویر تذکره" class="clickable-image" onclick="showModalImage(this.src)">` : '<div class="no-document">تصویر تذکره آپلود نشده است</div>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- مودال برای نمایش تصویر بزرگ -->
        <div id="imageModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModalImage()">&times;</span>
                <img id="modalImage" class="modal-image" src="" alt="تصویر بزرگ">
                <div class="modal-footer">
                    <button type="button" class="modal-close-btn" onclick="closeModalImage()">
                        <i class="fas fa-times"></i> بستن
                    </button>
                </div>
            </div>
        </div>
        
        <script>
            // اجازه دادن به راست کلیک و کپی کردن
            document.addEventListener('contextmenu', function(e) {
                // اجازه دادن به راست کلیک
                return true;
            });
            
            document.addEventListener('copy', function(e) {
                // اجازه دادن به کپی کردن
                return true;
            });
            
            // تابع نمایش تصویر در مودال
            function showModalImage(imageSrc) {
                const modal = document.getElementById('imageModal');
                const modalImage = document.getElementById('modalImage');
                
                modalImage.src = imageSrc;
                modal.style.display = "block";
                
                // جلوگیری از اسکرول صفحه اصلی هنگام نمایش مودال
                document.body.style.overflow = "hidden";
            }
            
            // تابع بستن مودال
            function closeModalImage() {
                const modal = document.getElementById('imageModal');
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
            
            // کلیک خارج از مودال برای بستن
            document.getElementById('imageModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModalImage();
                }
            });
            
            // کلید ESC برای بستن مودال
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModalImage();
                }
            });
        </script>
    </body>
    </html>`;
    
    return html;
}

// تابع اصلی: دانلود HTML فرم به صورت فقط خواندنی
function downloadHTML() {
    // اعتبارسنجی فرم قبل از دانلود
    if (!validateForm()) {
        showToast('لطفاً فیلدهای الزامی را پر کنید', 'error');
        return;
    }
    
    showToast('در حال ایجاد فایل HTML...', 'info');
    
    // جمع آوری تمام اطلاعات از فرم
    const formData = {
        trackingCode: document.getElementById('trackingCode').value,
        nameFa: document.getElementById('nameFa').value,
        nameEn: document.getElementById('nameEn').value,
        familyFa: document.getElementById('familyFa').value,
        familyEn: document.getElementById('familyEn').value,
        fatherName: document.getElementById('fatherName').value,
        grandfatherName: document.getElementById('grandfatherName').value,
        motherName: document.getElementById('motherName').value,
        afghanAddress: document.getElementById('afghanAddress').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        iranAddress: document.getElementById('iranAddress').value,
        iranConsulate: document.getElementById('iranConsulate').value,
        jobFa: document.getElementById('jobFa').value
    };
    
    // تابع تبدیل تصویر به base64
    function convertImageToBase64(imgElement) {
        if (!imgElement || imgElement.style.display === 'none') {
            return { base64: '', hasImage: false };
        }
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = imgElement.naturalWidth || imgElement.width;
            canvas.height = imgElement.naturalHeight || imgElement.height;
            ctx.drawImage(imgElement, 0, 0);
            const base64 = canvas.toDataURL('image/jpeg', 0.9);
            return { base64: base64, hasImage: true };
        } catch (error) {
            console.error('خطا در تبدیل عکس:', error);
            return { base64: '', hasImage: false };
        }
    }
    
    // تبدیل تصاویر به base64
    const profileImg = document.getElementById('preview');
    const profileResult = convertImageToBase64(profileImg);
    
    const passportImg = document.getElementById('passportPreview');
    const passportResult = convertImageToBase64(passportImg);
    
    const idCardImg = document.getElementById('idCardPreview');
    const idCardResult = convertImageToBase64(idCardImg);
    
    // ایجاد محتوای HTML برای فایل خروجی
    const htmlContent = createReadOnlyHTML(
        formData,
        profileResult.hasImage,
        profileResult.base64,
        passportResult.hasImage,
        passportResult.base64,
        idCardResult.hasImage,
        idCardResult.base64
    );
    
    // ایجاد Blob از HTML
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // ایجاد لینک دانلود
    const a = document.createElement('a');
    a.href = url;
    
    // ایجاد نام فایل بر اساس اطلاعات مشتری
    const fileName = generateFileName(formData);
    a.download = fileName;
    
    // کلیک بر روی لینک برای دانلود
    document.body.appendChild(a);
    a.click();
    
    // حذف لینک
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showToast('فایل HTML با موفقیت دانلود شد!', 'success');
}

// تنظیمات اولیه
document.addEventListener('DOMContentLoaded', function() {
    // رویدادهای دکمه‌های اصلی
    document.getElementById('uploadButton').addEventListener('click', function() {
        document.getElementById('photo-upload').click();
    });
    
    document.getElementById('photo-upload').addEventListener('change', loadPhoto);
    document.getElementById('clearButton').addEventListener('click', clearForm);
    document.getElementById('htmlButton').addEventListener('click', downloadHTML);
    
    // رویدادهای آپلود پاسپورت
    document.getElementById('passportUploadArea').addEventListener('click', function() {
        document.getElementById('passportUpload').click();
    });
    
    document.getElementById('passportUpload').addEventListener('change', loadPassport);
    
    document.getElementById('viewPassportBtn').addEventListener('click', function() {
        const passportImg = document.getElementById('passportPreview');
        if (passportImg.style.display !== 'none') {
            showImageModal(passportImg.src);
        }
    });
    
    document.getElementById('changePassportBtn').addEventListener('click', function() {
        document.getElementById('passportUpload').click();
    });
    
    // رویدادهای آپلود تذکره
    document.getElementById('idCardUploadArea').addEventListener('click', function() {
        document.getElementById('idCardUpload').click();
    });
    
    document.getElementById('idCardUpload').addEventListener('change', loadIdCard);
    
    document.getElementById('viewIdCardBtn').addEventListener('click', function() {
        const idCardImg = document.getElementById('idCardPreview');
        if (idCardImg.style.display !== 'none') {
            showImageModal(idCardImg.src);
        }
    });
    
    document.getElementById('changeIdCardBtn').addEventListener('click', function() {
        document.getElementById('idCardUpload').click();
    });
    
    // کلیک بر روی تصاویر پیش‌نمایش برای نمایش کامل
    document.getElementById('passportPreview').addEventListener('click', function() {
        if (this.style.display !== 'none') {
            showImageModal(this.src);
        }
    });
    
    document.getElementById('idCardPreview').addEventListener('click', function() {
        if (this.style.display !== 'none') {
            showImageModal(this.src);
        }
    });
    
    // بستن مودال
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // فرمت خودکار شماره تماس
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^0/, '۰');
            e.target.value = value;
            autoExpand(this);
        });
    }
    
    // تنظیم مقدار پیش‌فرض سفارت ایران
    const consulateInput = document.getElementById('iranConsulate');
    if (consulateInput) {
        consulateInput.value = 'سرکنسولگری جمهوری اسلامی ایران - مزارشریف';
    }
    
    // رویداد autoExpand برای تمام فیلدها
    const autoExpandFields = document.querySelectorAll('.auto-expand');
    autoExpandFields.forEach(field => {
        field.addEventListener('input', function() {
            autoExpand(this);
        });
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // رویدادهای دیگر
    const inputs = document.querySelectorAll('.form-input, .code-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});
