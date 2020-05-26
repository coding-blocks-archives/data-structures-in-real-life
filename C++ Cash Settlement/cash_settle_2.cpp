#include <iostream>
#include<set>
#include<map>
using namespace std;
// Money Splitwise Algorithm

/*
Output - Should also show transactions
Rahul pays 50 to Ajay
Rahul pays 10 to Neha
2
*/

class person_compare {
public:
    bool operator()(pair<string, int> p1, pair<string, int> p2) {
        return p1.second < p2.second;
    }
};


int main() {

    int no_of_transactions, friends;
    cin >> no_of_transactions >> friends;

    string x, y;
    int amount;

    map<string, int> net;

    while (no_of_transactions--) {
        cin >> x >> y >> amount;
        if (net.count(x) == 0) {
            net[x] = 0;
        }
        if (net.count(y) == 0) {
            net[y] = 0;
        }
        net[x] -= amount;
        net[y] += amount;
    }

    //Iterate over the persons, add those person in the multiset who have non zero net

    multiset<pair<string, int>, person_compare> m;

    for (auto p : net) {
        string person = p.first;
        int amount = p.second;

        if (net[person] != 0) {
            m.insert(make_pair(person, amount));
        }
    }

    //3. settlements (start & end)
    int cnt = 0;
    while (!m.empty()) {
        auto low = m.begin();
        auto high = prev(m.end());

        int debit = low->second;
        string debit_person = low->first;

        int credit = high->second;
        string credit_person = high->first;

        //Pop them out
        m.erase(low);
        m.erase(high);

        int settled_amount = min(-debit, credit);
        debit += settled_amount;
        credit -= settled_amount;

        //Print the Transaction between people
        cout << debit_person << " will pay " << settled_amount << " to " << credit_person << endl;

        if (debit != 0) {
            m.insert(make_pair(debit_person, debit));
        }
        if (credit != 0) {
            m.insert(make_pair(credit_person, credit));
        }
        cnt += 1;

    }
    cout << cnt << endl;
    return 0;
}