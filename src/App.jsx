import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Ad Soyad gerekli'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta girin'
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Geçerli bir telefon numarası girin'
    if (!formData.address.trim()) newErrors.address = 'Adres gerekli'
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Geçerli bir kart numarası girin'
    if (!formData.expiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'AA/YY formatında girin'
    if (!formData.cvv.trim() || formData.cvv.length !== 3) newErrors.cvv = '3 haneli CVV girin'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log('Form Verileri:', formData)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      console.log('✅ Ödeme başarılı!')

      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          cardNumber: '',
          expiry: '',
          cvv: ''
        })
      }, 3000)
    }, 2000)
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value)
    setFormData(prev => ({ ...prev, expiry: formatted }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h3>
              <p className="text-gray-600">Siparişiniz alınmıştır. Teşekkür ederiz!</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slideInLeft">
                Premium Kablosuz Kulaklık
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 animate-slideInLeft" style={{animationDelay: '0.1s'}}>
                Yüksek kaliteli ses, gürültü önleme ve 30 saat pil ömrü ile müziğin tadını çıkarın.
              </p>
              <div className="flex items-center gap-4 animate-slideInLeft" style={{animationDelay: '0.2s'}}>
                <span className="text-5xl font-bold">299 TL</span>
                <span className="text-2xl line-through text-indigo-200">499 TL</span>
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">%40 İNDİRİM</span>
              </div>
              <button
                onClick={() => document.getElementById('payment-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg animate-slideInLeft"
                style={{animationDelay: '0.3s'}}
              >
                Hemen Al 🚀
              </button>
            </div>
            <div className="animate-slideInRight">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="Premium Kulaklık"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Ürün Özellikleri</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎵', title: 'Hi-Fi Ses Kalitesi', desc: 'Studio kalitesinde kristal netliğinde ses' },
              { icon: '🔇', title: 'Aktif Gürültü Önleme', desc: 'Çevresel sesleri %95 oranında azaltır' },
              { icon: '🔋', title: '30 Saat Pil Ömrü', desc: 'Tek şarjla kesintisiz 30 saat kullanım' },
              { icon: '💧', title: 'Su Geçirmez', desc: 'IPX7 sertifikası ile her koşulda kullanım' },
              { icon: '🎤', title: 'Dahili Mikrofon', desc: 'Kristal netliğinde aramalar için' },
              { icon: '⚡', title: 'Hızlı Şarj', desc: '10 dakikada 3 saat kullanım süresi' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-2 duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">🚚</div>
              <h3 className="font-bold text-lg mb-1">Ücretsiz Kargo</h3>
              <p className="text-indigo-100">Tüm siparişlerde</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-bold text-lg mb-1">Güvenli Ödeme</h3>
              <p className="text-indigo-100">256-bit SSL şifreleme</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">↩️</div>
              <h3 className="font-bold text-lg mb-1">14 Gün İade</h3>
              <p className="text-indigo-100">Koşulsuz iade garantisi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section id="payment-form" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 border border-indigo-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Siparişi Tamamla</h2>
            <p className="text-center text-gray-600 mb-8">Güvenli ödeme ile hemen sipariş verin</p>

            {/* Demo Card Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 font-medium">
                📝 <strong>Demo Test Kartı:</strong> 4242 4242 4242 4242 | CVV: 123 | Tarih: 12/25
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Ahmet Yılmaz"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="0555 123 45 67"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Teslimat Adresi *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Mahalle, Sokak, Bina No, Daire"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Ödeme Bilgileri</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kart Numarası *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className={`w-full px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="4242 4242 4242 4242"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Son Kullanma *</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className={`w-full px-4 py-3 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      placeholder="12/25"
                    />
                    {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={3}
                      className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      placeholder="123"
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Ürün Fiyatı:</span>
                  <span className="font-semibold">299 TL</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Kargo:</span>
                  <span className="font-semibold text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t border-indigo-200 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Toplam:</span>
                  <span className="text-2xl font-bold text-indigo-600">299 TL</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </span>
                ) : (
                  '🔒 Ödemeyi Tamamla'
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                <span>🔒 SSL Güvenli</span>
                <span>•</span>
                <span>💳 Visa / Mastercard</span>
                <span>•</span>
                <span>✓ 3D Secure</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Premium Kulaklık. Tüm hakları saklıdır.</p>
          <p className="text-sm text-gray-500 mt-2">Bu demo bir e-ticaret sitesidir. Gerçek ödeme yapılmamaktadır.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default App
