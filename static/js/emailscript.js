document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('dataset-modal');
    const openBtn = document.getElementById('dataset-button');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-button');

    // 1. 模态框显示/隐藏逻辑
    
    // 点击 Dataset 按钮打开模态框
    openBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止 # 链接跳转
        modal.style.display = 'block';
    });

    // 点击 Cancel 按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        form.reset(); // 关闭时重置表单
    });

    // 点击模态框背景区域关闭模态框
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            form.reset();
        }
    });

    // 2. EmailJS 表单提交逻辑
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 阻止表单默认提交行为
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // 收集表单数据
        const templateParams = {
            name: document.getElementById('modal-name').value,
            email: document.getElementById('modal-email').value,
            unit: document.getElementById('modal-unit').value,
            message: document.getElementById('modal-reason').value,
            subject: document.querySelector('input[name="subject"]').value, // 隐藏字段的主题
        };
        console.log(templateParams)
        
        // 使用 EmailJS 发送邮件
        emailjs.send('service_y32rm7a', 'template_mq40w1s', templateParams) 
            .then(
                () => {
                    alert('Your Dataset request has been submitted successfully! We will get back to you as soon as possible.');
                    modal.style.display = 'none'; // 成功后关闭模态框
                    form.reset(); // 重置表单
                },
                (error) => {
                    // 捕获发送失败的错误
                    console.error("Email Sent Failed:", error);
                    alert('Email sending failed! Please submit your request directly by emailing.');
                }
            )
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Request';
            });
    });
});
