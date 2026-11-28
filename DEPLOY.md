# Deploy Otomatis (CD)

Setiap push ke `main`, GitHub Actions membangun situs lalu menyalin `dist/` ke VPS lewat SSH (`.github/workflows/ci.yml`). Pull request hanya di-build, tidak di-deploy.

Selesaikan semua langkah di bawah **sebelum** workflow ini di-merge. Kalau belum, langkah deploy akan gagal (situs yang sedang jalan tidak terpengaruh).

Syarat: SSH VPS bisa diakses dari internet.

## 1. Cek folder web dan rrsync (di VPS)

```bash
grep -n "root " /etc/caddy/Caddyfile
which rrsync
```

Panduan ini memakai `/var/www/kubiko/dist` dan `/usr/bin/rrsync`. Sesuaikan kalau hasilnya berbeda. Kalau `rrsync` tidak ditemukan, pasang atau perbarui paket `rsync` (rsync 3.2.4 ke atas).

## 2. Buat user khusus deploy (di VPS)

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo chown -R deploy:deploy /var/www/kubiko/dist
```

Setelah ini folder `dist` diurus oleh deploy otomatis:

- `npm run build` manual di folder tersebut akan gagal karena izin.
- Berkas di `dist` yang bukan hasil build akan **dihapus** saat deploy.

## 3. Buat kunci SSH khusus (di komputer lokal)

Tekan Enter dua kali (tanpa passphrase).

```bash
ssh-keygen -t ed25519 -f ~/.ssh/kubiko_deploy -C kubiko-deploy
```

Di PowerShell, ganti `~/.ssh/kubiko_deploy` dengan `"$HOME\.ssh\kubiko_deploy"`.

## 4. Pasang kunci publik (di VPS)

Ganti `ISI_KUNCI_PUBLIK` dengan isi file `kubiko_deploy.pub`.

```bash
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
echo 'restrict,command="/usr/bin/rrsync -wo /var/www/kubiko/dist" ISI_KUNCI_PUBLIK' | sudo tee /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Opsi `restrict` dan `rrsync -wo` membuat kunci ini hanya bisa menulis ke folder `dist`, tanpa akses shell.

Kalau `sshd_config` memakai `AllowUsers`, tambahkan `deploy`.

## 5. Isi secrets (di komputer lokal)

Ambil baris `known_hosts` langsung dari VPS (di VPS). Jangan pakai `ssh-keyscan` Windows, versi lamanya gagal terhadap server OpenSSH baru (`unsupported KEX method`).

```bash
echo "<VPS_HOST> $(cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub)"
```

Salin satu baris hasilnya sebagai `<BARIS_KNOWN_HOSTS>`. Lalu simpan keempat secrets dengan GitHub CLI (PowerShell). Akses *write* sebagai collaborator sudah cukup, lewat CLI atau **Settings → Secrets and variables** di web. Ganti `<VPS_HOST>` dengan IP atau hostname VPS (pakai IP kalau domain lewat proxy Cloudflare).

```powershell
$repo = "muhaliakbar14-cyber/kubiko"
gh secret set VPS_HOST --repo $repo --body "<VPS_HOST>"
gh secret set VPS_USER --repo $repo --body "deploy"
Get-Content -Raw "$HOME\.ssh\kubiko_deploy" | gh secret set VPS_SSH_KEY --repo $repo
gh secret set VPS_KNOWN_HOSTS --repo $repo --body "<BARIS_KNOWN_HOSTS>"
gh secret list --repo $repo
```

Kunci privat hanya boleh disimpan di komputermu, GitHub Secrets, atau password manager. Jangan kirim lewat chat dan jangan di-commit.

Port SSH selain 22: tambahkan `-e "ssh -p PORT"` pada perintah `rsync` di workflow, dan tulis host di baris `known_hosts` sebagai `[<VPS_HOST>]:PORT`.

## Verifikasi

Merge ke `main`, lalu lihat tab **Actions**. Langkah **Cek halaman live** gagal kalau `https://kubiko.my.id/math-hero` tidak menampilkan halaman Math Hero.
