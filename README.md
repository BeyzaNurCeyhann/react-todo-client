
# React Todo Client

Bu proje, Laravel tabanlı bir API ile entegre çalışan bir React Todo uygulamasıdır. Kullanıcılar görevlerini yönetebilir, kategorilere ayırabilir ve rollerine göre yetkilendirilebilirler.

## Özellikler

- JWT tabanlı kimlik doğrulama
- Rol bazlı yetkilendirme (admin ve user)
- Görevleri listeleme, ekleme, güncelleme ve silme
- Kategorilere göre görevleri filtreleme
- Kullanıcı dostu arayüz ve gezinme

##  Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/BeyzaNurCeyhann/react-todo-client.git
cd react-todo-client
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

`.env` dosyasında API URL'sini belirtin:
```env
VITE_API_URL=http://localhost:8000/api
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

##Kimlik Doğrulama ve Yetkilendirme

- Kullanıcılar, e-posta ve şifre ile giriş yaparlar.
- Giriş başarılı olduğunda, API'den alınan JWT token ve kullanıcı bilgileri `localStorage`'a kaydedilir:
```javascript
localStorage.setItem('token', response.data.data.token);
localStorage.setItem('user', JSON.stringify(response.data.data.user));
```

- Uygulama, kullanıcı rolüne göre erişim kontrolü sağlar. Örneğin, sadece `admin` rolüne sahip kullanıcılar "Kategoriler" sayfasını görebilir.

##Proje Yapısı

```
react-todo-client/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── services/
│   │   ├── authService.js
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
└── ...
```

## Test Kullanıcıları

| Rol   | E-posta             | Şifre    |
|-------|---------------------|----------|
| Admin | admin@example.com   | password |
| User  | user@example.com    | password |

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.
