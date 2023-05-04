/*Buat sebuah aplikasi untuk:
1. menyimpan data stok barang (id barang, nama, harga, kuantitas)
2. menampilkan semua data stok barang
3. menampilkan total harga semua barang (harga * kuantitas)
4. update data barang *opsional
5. hapus data barang *opsional

** data di simpan ke dalam sebuah file
** data inputan diambil dari prompt atau inputan user*/

const path = require('path')
const fs = require('fs');
const prompt = require('prompt-sync')();

function simpanData(namaFile, data) {
    const exists = fs.existsSync(namaFile + '.json');
    let existingData = '[]';
    if (!exists) {
        fs.mkdirSync(path.dirname(namaFile), { recursive: true });
    } else {
        existingData = bacaData(namaFile + '.json');
    }
    let dataBaru = JSON.parse(existingData);
    dataBaru.push(data);
    dataBaru = JSON.stringify(dataBaru);

    fs.writeFile(namaFile + '.json', dataBaru, function (err) {
        if (err) {
            throw err;
        }
    });
}
function bacaData(namaFile) {
    const data = fs.readFileSync(namaFile);
    if (data) {
        return data.toString('utf-8');
    }
    return undefined;
}

let database = []

// Create 
function create(data) {
  database.push(data);
}

// Read 
function read() {
  return database;
}

// Update 
function update(index, newData) {
  if (index >= 0 && index < database.length) {
    database[index] = newData;
    return true;
  }
  return false;
}

// Delete 
function remove(index) {
  if (index >= 0 && index < database.length) {
    database.splice(index, 1);
    return true;
  }
  return false;
}


let exit = false
while (!exit) {
    
    const idBarang = prompt('IdBarang: ');
    const nama = prompt('Nama: ');
    const harga = prompt('Harga: ');
    const kualitas = prompt('Kualitas (terbaik, sedang atau biasa): ');

    const dataStokBarang = {
        idBarang,
        nama,
        harga,
        kualitas,
    };

    switch (kualitas) {
        case 'terbaik':
        case 'sedang': 
        case 'biasa':
            simpanData(`kualitas-stokBerang/kualitas-${kualitas}`, dataStokBarang); 
            break;

        default:
            console.log('semua masuk ke arsip');
            break;
    }
    const ulangi = prompt('Apakah ingin mengulangu? (Y/N)');
    if (ulangi == 'N') {
        exit = true;
        console.log('Keluar aplikasi');
    }
}


create('27');
create('MIE SEDAP');
create('60000');
create('terbaik');
console.log(read()); 

update(1, );
console.log(read());

remove(0);
console.log(read()); 

