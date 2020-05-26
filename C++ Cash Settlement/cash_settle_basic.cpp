#include <iostream>
#include<set>
using namespace std;

// Money Splitwise Algorithm

int main() {

    int no_of_transactions, friends;
    cin >> no_of_transactions >> friends;

    int x, y, amount;

    int N = 100000;
    int net[N] = {0};


    while (no_of_transactions--) {
        cin >> x >> y >> amount;
        //x will pay amount to y
        net[x] -= amount;
        net[y] += amount;
    }

    multiset<int> m;

    //Initialise the list and sort it -> Multiset. (T + NLogN Approach)
    int cnt = 0;

    for (int i = 0; i < friends; i++) {
        if (net[i] != 0) {
            m.insert(net[i]);
        }
    }

    while (!m.empty()) {
        auto low = m.begin();
        auto high = prev(m.end());
        int debit = *low;
        int credit = *high;

        m.erase(low);
        m.erase(high);

        //settlement
        int settled_amount = min(abs(debit), abs(credit));
        debit += settled_amount;
        credit -= settled_amount;

        if (debit != 0) {
            m.insert(debit);
        }
        if (credit != 0) {
            m.insert(credit);
        }
        cnt++;
    }

    cout << cnt << endl;
    return 0;
}