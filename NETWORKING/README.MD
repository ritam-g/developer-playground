# 🌐 Networking Revision Notes (DevOps Prep)

> Ye file teri daily revision ke liye hai. Jo jo topic tune abhi tak cover kiya hai, sab yahan flow me hai — **Network → Host → MAC vs IP → Switch → CIDR → Subnet Mask → OSI Model → TCP/IP Model → Packet Journey → ARP**.

---

## 1. What is a NETWORK?

> **Network = Ek "Area" (Mohalla) jo multiple devices (Hosts) ko aapas me jodta hai.**

- Jaise ek gali me multiple ghar hote hain, waise hi ek network me multiple devices (phones, laptops, printers) hote hain.
- **Sabse important baat:** Ek hi network me sab devices ka **Network part (pehle 3 octets)** same hota hai. Isi se unhe pata chalta hai ki "Hum ek hi mohalle me rehte hain".

```mermaid
graph TD
    A[Laptop<br/>192.168.1.2] --- S((Switch))
    B[Phone<br/>192.168.1.3] --- S
    C[TV<br/>192.168.1.4] --- S
    D[Printer<br/>192.168.1.5] --- S
    S -.->|"Sab same Network:<br/>192.168.1.x"| S
```

---

## 2. What is a HOST?

> **Host = Ek single system (ek device)** jo data **bhejta** ya **receive** karta hai.

- **Sabse important baat:** Ek host (jaise tera phone) **multiple networks** se ek saath connect ho sakta hai! (Ghar ka Wi-Fi, office ka VPN, Mobile Data — teeno ek saath).

```mermaid
graph TD
    P[Tera Phone<br/>EK HOST]
    P -->|Wi-Fi| N1["Network 1<br/>192.168.1.5"]
    P -->|VPN| N2["Network 2<br/>10.0.0.8"]
    P -->|Jio Data| N3["Network 3<br/>100.1.1.2"]
```

---

## 3. MAC Address vs IP Address

> **MAC Address = Physical Identity** teri machine ki (jaise tera Aadhar card — kabhi nahi badalta).
> **IP Address = Logical Identity** (jaise tera current ghar ka address — badal sakta hai).

| Point            | MAC Address                                 | IP Address                                  |
| ---------------- | ------------------------------------------- | ------------------------------------------- |
| Type             | Physical (Hardware)                         | Logical                                     |
| Diya kisne       | NIC manufacturer ne (burned-in)             | Network/Router ne (DHCP)                    |
| Change hota hai? | ❌ Nahi (mostly fixed)                      | ✅ Haan (network badalte hi badal jata hai) |
| Kaam             | Same network ke andar device identify karna | Ek network se dusre network tak route karna |
| Example          | `A4:C3:F0:85:AC:2D`                       | `192.168.1.10`                            |

> ⚡ **Yaad rakhne wali line:** *"IP CAN CHANGE, BUT MAC ALWAYS REMAINS SAME."*

```mermaid
graph LR
    Laptop["Laptop"]
    Laptop --> MAC["MAC Address<br/>Physical Identity<br/>(Fixed - NIC card se milta hai)"]
    Laptop --> IP["IP Address<br/>Logical Identity<br/>(Changeable - network ke hisaab se)"]
```

---

## 4. What is a SWITCH?

> **Switch = Ek device jo ek hi network (LAN) ke andar sab devices ko connect karta hai, aur data ko sahi device tak bhejta hai — MAC address use karke.**

- Switch **MAC address table** maintain karta hai — kaunsa device kis port pe connected hai.
- Jab data aata hai, switch check karta hai destination MAC address, aur sirf **usi port** pe data bhejta hai (poore network me broadcast nahi karta jaisa hub karta tha).

```mermaid
graph TD
    SW((SWITCH<br/>MAC Table))
    L[Laptop<br/>MAC: AA:11] ---|Port 1| SW
    P[Phone<br/>MAC: BB:22] ---|Port 2| SW
    T[TV<br/>MAC: CC:33] ---|Port 3| SW
    Pr[Printer<br/>MAC: DD:44] ---|Port 4| SW
```

> 💡 **Switch vs Router (quick note):** Switch same network (LAN) ke andar MAC address se data bhejta hai. Router alag-alag networks ke beech IP address se data route karta hai.

---

## 5. What is CIDR? (Classless Inter-Domain Routing)

> **CIDR ek "notation" hai jo batata hai ki IP address ka kaunsa hissa NETWORK hai aur kaunsa HOST hai.**

- **Kaam:** Batata hai ki **Network kahan khatam hota hai** aur **Host kahan shuru hota hai**.
- **Fayda:** Router confuse nahi hota — usko pata chal jata hai ki packet kis network ke liye hai.

### CIDR Notation: `IP_Address / Number`

Example: `192.168.1.0/24`

- **`/24`** = pehle 24 bits (3 octets) **NETWORK**
- Baaki 8 bits (1 octet) **HOST**

```mermaid
graph LR
    subgraph "192.168.1.100 /24"
        N1["192"] --- N2["168"] --- N3["1"] --- H["100"]
    end
    N1 -.Network.-> N3
    H -.Host.-> H
```

### Router Confusion Door Karna:

```mermaid
sequenceDiagram
    participant Host as Host (192.168.1.5)
    participant Router
    Host->>Router: Data bhejna hai, mera CIDR: /24
    Router->>Router: "Ye 192.168.1.x network ka hai"
    Router->>Router: Data ko Network A me daal do
```

---

## 6. What is Subnet Mask?

> **Subnet Mask CIDR ka hi "dusra roop" hai — same cheez, alag likhne ka tareeka.**

- `/24` ko subnet mask me likhte hain: **`255.255.255.0`**
- Subnet Mask batata hai kaunse bits **Network** hain (1s) aur kaunse **Host** hain (0s).

| CIDR | Subnet Mask     | Network Bits | Host Bits | Total Usable Hosts |
| ---- | --------------- | ------------ | --------- | ------------------ |
| /24  | 255.255.255.0   | 24           | 8         | 254                |
| /16  | 255.255.0.0     | 16           | 16        | 65,534             |
| /29  | 255.255.255.248 | 29           | 3         | 6                  |

```mermaid
graph LR
    subgraph "Subnet Mask 255.255.255.0"
        B1["11111111"] --- B2["11111111"] --- B3["11111111"] --- B4["00000000"]
    end
    B1 -.Network = 1s.-> B3
    B4 -.Host = 0s.-> B4
```

> 💡 **Real life example:** Agar tere ghar me sirf 5 devices hain, poora `/24` (254 IPs) waste hoga. `/29` use karke sirf 6 IPs milti hain — CIDR + Subnet Mask dono milke IPs bachate hain.

---

## 7. OSI Model (7 Layers)

> **OSI Model = Ek theoretical blueprint jo batata hai ki data kaise ek device se dusre device tak travel karta hai — 7 layers me divide karke.**

```mermaid
graph TD
    L7["Layer 7 - Application<br/>(Browser, App - jo tu use karta hai)"]
    L6["Layer 6 - Presentation<br/>(Encryption, Format - jaise SSL)"]
    L5["Layer 5 - Session<br/>(Connection maintain karna)"]
    L4["Layer 4 - Transport<br/>(TCP/UDP - reliable delivery)"]
    L3["Layer 3 - Network<br/>(IP Address, Routing)"]
    L2["Layer 2 - Data Link<br/>(MAC Address, Switch)"]
    L1["Layer 1 - Physical<br/>(Cables, Wi-Fi signals)"]
    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1
```

| Layer | Naam         | Kaam                                    | Example               |
| ----- | ------------ | --------------------------------------- | --------------------- |
| 7     | Application  | User ke sath interact karta hai         | Chrome, WhatsApp      |
| 6     | Presentation | Data ko format/encrypt karta hai        | SSL/TLS               |
| 5     | Session      | Connection start/maintain/end karta hai | Login session         |
| 4     | Transport    | Reliable data delivery                  | TCP, UDP              |
| 3     | Network      | IP address se routing                   | Router                |
| 2     | Data Link    | MAC address se local delivery           | Switch                |
| 1     | Physical     | Actual signal/cable/wifi                | Ethernet cable, Wi-Fi |

> 🧠 **Yaad rakhne ka trick:** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing (Application → Physical, top to bottom)

---

## 8. TCP/IP Model (4 Layers)

> **TCP/IP Model = OSI ka "practical version" jo real duniya me actually use hota hai (Internet isi pe chalta hai). OSI ke 7 layers ko simplify karke 4 me daal diya.**

```mermaid
graph TD
    T4["Application<br/>(OSI Layer 5+6+7)"]
    T3["Transport<br/>(OSI Layer 4 - TCP/UDP)"]
    T2["Internet<br/>(OSI Layer 3 - IP Address)"]
    T1["Network Access<br/>(OSI Layer 1+2 - MAC, Cables)"]
    T4 --> T3 --> T2 --> T1
```

| TCP/IP Layer   | OSI Layers Combined | Kaam                            |
| -------------- | ------------------- | ------------------------------- |
| Application    | 5, 6, 7             | User apps, data format, session |
| Transport      | 4                   | TCP/UDP - reliable delivery     |
| Internet       | 3                   | IP addressing, routing          |
| Network Access | 1, 2                | MAC address, physical cables    |

---

## 9. Source IP se Destination IP tak Data Kaise Jaata Hai (Packet Journey)

> Ab sab kuch jodte hain — Host, MAC, IP, Switch, CIDR, OSI/TCP layers — ek real packet journey me.

```mermaid
sequenceDiagram
    participant A as Host A (Source)<br/>IP: 192.168.1.5<br/>MAC: AA:11
    participant SW as Switch (Same LAN)
    participant R as Router
    participant SW2 as Switch (Dest LAN)
    participant B as Host B (Destination)<br/>IP: 192.168.2.10<br/>MAC: BB:22

    A->>A: Data ready + Layer 4-7 (App, Transport)
    A->>A: CIDR check: Destination same network me hai kya?
    Note over A: 192.168.2.10 different network hai<br/>(different /24)
    A->>SW: Packet with Router's MAC (Layer 2)
    SW->>R: Forward to Router (via MAC table)
    R->>R: Check destination IP + routing table
    R->>SW2: Forward packet to correct network
    SW2->>B: Deliver using Host B's MAC address
    B->>B: Data receive + process (App layer)
```

### Step-by-step (Simple words):

1. **Application Layer** pe data create hota hai (jaise browser se request).
2. **Transport Layer** (TCP) data ko chote packets me todta hai, reliable delivery ensure karta hai.
3. **Network Layer** pe **Source IP aur Destination IP** attach hote hain. CIDR/Subnet Mask check hota hai ki destination **same network** me hai ya **different network** me.
4. Agar same network me hai → seedha **Switch** ke through **MAC address** se deliver ho jata hai.
5. Agar different network me hai → packet **Router** ke paas jata hai (Router ka MAC address use hota hai locally, but IP wahi rehta hai destination ka).
6. Router apni **routing table** dekhta hai aur packet ko sahi network ki taraf forward karta hai.
7. Destination network ka **Switch** MAC address se packet ko sahi host tak deliver karta hai.
8. Destination host pe data upar layers se hote hue Application layer tak pahunchta hai.

> ⚡ **Important point:** Poore journey me **IP address same rehta hai (source aur destination)**, lekin **MAC address har hop pe badalta hai** (Layer 2 pe local delivery ke liye) — yehi wajah hai ki IP "logical/end-to-end" hai aur MAC "physical/local" hai.

---

## 10. ARP (Address Resolution Protocol)

> **ARP = Ek protocol jo IP Address ko MAC Address me "resolve" karta hai.**

- Jab bhi koi Host kisi ko (same LAN me ya Router ko) data bhejna chahta hai, use **Layer 2 pe MAC address chahiye hota hai** — sirf IP address se kaam nahi chalta.
- Par Host ko sirf destination ka **IP pata hota hai, MAC nahi**. Isi problem ko ARP solve karta hai.

> ⚡ **Yaad rakhne wali line:** *"DURING SENDING MESSAGE, IT WILL HAVE MAC"* — matlab bhejne se pehle MAC address pata hona zaroori hai, aur wahi kaam ARP karta hai.

### ARP kaam kaise karta hai (2 steps):

1. **ARP Request (Broadcast):** Host A poore LAN me chilla ke poochta hai — *"Jiska IP ye hai, apna MAC address bhejo!"* (ye request sabko jaati hai — Broadcast).
2. **ARP Reply (Unicast):** Jis Host ka wo IP hai, sirf wahi reply karta hai apne MAC address ke sath — seedha Host A ko (Unicast).
3. Host A ab ye mapping (IP ↔ MAC) apne **ARP Cache/Table** me save kar leta hai, taaki baar baar poochna na pade.

### Diagram (Tere notes wala example — Network: 192.143.2.0)

```mermaid
graph TD
    subgraph "LAN Network: 192.143.2.0/24"
        A["Host A<br/>192.143.2.1"]
        B["Host B<br/>192.143.2.2"]
        C["Host C<br/>192.143.2.3"]
    end
    R(("Router R"))
    A --- R
    B --- R
    C --- R
```

### ARP Request/Reply Flow (Host A ko Router R ka MAC chahiye):

```mermaid
sequenceDiagram
    participant A as Host A (192.143.2.1)
    participant B as Host B (192.143.2.2)
    participant C as Host C (192.143.2.3)
    participant R as Router R

    Note over A: A ko Router ko data bhejna hai<br/>Sirf IP pata hai, MAC nahi
    A->>B: ARP Request (Broadcast):<br/>"Kiska IP 192.143.2.X (Router) hai? MAC batao"
    A->>C: ARP Request (Broadcast)
    A->>R: ARP Request (Broadcast)
    Note over B,C: B aur C ignore karte hain<br/>(unka IP match nahi karta)
    R->>A: ARP Reply (Unicast):<br/>"Mera IP ye hai, mera MAC: XX:XX:XX"
    Note over A: A ab IP↔MAC mapping<br/>apne ARP Cache me save karta hai
    A->>R: Ab actual data bhejta hai<br/>(Destination MAC ke sath)
```

### Quick Points:

| Point               | Detail                                                                           |
| ------------------- | -------------------------------------------------------------------------------- |
| Full Form           | Address Resolution Protocol                                                      |
| Kaam                | IP Address → MAC Address resolve karna                                          |
| Request Type        | Broadcast (sabko jaati hai)                                                      |
| Reply Type          | Unicast (sirf jiska IP match kare, wahi reply karta hai)                         |
| Store kaha hota hai | ARP Cache / ARP Table (temporary, kuch time baad expire)                         |
| Layer               | Technically Layer 2 aur Layer 3 ke beech kaam karta hai                          |
| Kyun zaroori hai    | Kyunki Switch/Layer 2 delivery**sirf MAC address** se hoti hai, IP se nahi |

> 💡 **Packet Journey se connection:** Section 9 me jo tune padha tha ki "Router ka MAC address use hota hai locally" — wahi MAC address Host ko **ARP se hi milta hai**. Matlab har baar jab packet agle hop pe jata hai, ARP hi decide karta hai ki us hop ka MAC kya hai.

---

## 🔑 Quick Revision Table (Sabse Important — Ek Nazar Me)

| Concept                  | Kya Hai                                        | Yaad Rakhne Wali Line                         |
| ------------------------ | ---------------------------------------------- | --------------------------------------------- |
| **Network**        | Devices ka group jinka network part same hai   | Ek mohalla                                    |
| **Host**           | Ek single device                               | Ek ghar / ek member                           |
| **MAC Address**    | Physical identity, fixed                       | Aadhar card — kabhi nahi badalta             |
| **IP Address**     | Logical identity, changeable                   | Ghar ka address — badal sakta hai            |
| **Switch**         | Same LAN ke andar MAC se data bhejta hai       | MAC table maintain karta hai                  |
| **CIDR**           | Network aur Host ka split batata hai (`/24`) | Router ko raasta dikhata hai                  |
| **Subnet Mask**    | CIDR ka dusra format (`255.255.255.0`)       | 1s = Network, 0s = Host                       |
| **OSI Model**      | 7 layers ka theoretical blueprint              | Application → Physical                       |
| **TCP/IP Model**   | 4 layers ka practical/real-world model         | OSI ka simplified version                     |
| **Packet Journey** | Data source se destination tak kaise jata hai  | IP same rehta hai, MAC har hop pe badalta hai |
| **ARP**            | IP Address ko MAC Address me resolve karta hai | Request Broadcast, Reply Unicast              |

---

**Next revision me jo naya topic seekhega (Router deep-dive, DNS, DHCP, Ports, TCP 3-way handshake, etc.) wo isi file me next section me add karte jaana — flow yahi rakhna hai.** 🚀
