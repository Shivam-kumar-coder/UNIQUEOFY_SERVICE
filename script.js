/* Zomato Style List */
.service-list-item {
    display: flex; justify-content: space-between;
    padding: 20px; border-bottom: 1px solid #eee; background: #fff;
}
.s-info { flex: 1; padding-right: 15px; }
.s-info h4 { font-size: 1.1rem; color: #1c1c1c; margin-bottom: 4px; }
.price { font-weight: 700; color: #333; display: block; margin-bottom: 8px; }
.limit-text { font-size: 0.85rem; color: #666; line-height: 1.4; }

.s-img { position: relative; width: 110px; height: 110px; }
.s-img img { width: 100%; height: 100%; border-radius: 12px; object-fit: cover; }
.add-btn {
    position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
    background: #fff; color: var(--primary); border: 1px solid #ddd;
    padding: 5px 25px; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Detail Modal Full Screen */
.modal-content.full-screen {
    width: 100%; height: 100%; margin: 0; border-radius: 0; overflow-y: auto;
}
#detailImg { width: 100%; height: 250px; object-fit: cover; }
.detail-info { padding: 20px; }
.sticky-book-btn {
    position: fixed; bottom: 20px; left: 5%; width: 90%;
    background: #e03d4e; color: #fff; padding: 15px; border: none;
    border-radius: 12px; font-size: 1.1rem; font-weight: bold;
}

/* Tracking Mini Card */
.tracking-mini-card {
    background: #1c1c1c; color: #fff; padding: 15px;
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; z-index: 100;
}
.pulse {
    height: 10px; width: 10px; background: #4caf50; border-radius: 50%;
    display: inline-block; margin-right: 8px; animation: blink 1s infinite;
}
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
