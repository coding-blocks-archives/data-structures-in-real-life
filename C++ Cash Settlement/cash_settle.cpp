#include <iostream>
#include<set>
#include<map>
using namespace std;

class person_compare {
public:
    bool operator()(pair<string, int> p1, pair<string, int> p2) {
        return p1.second < p2.second;
    }
};

int main() {

    //We will also account for the trasactions
    // Who will give what amount to each
    // 2 steps
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
        cout << net[x] << endl;
        net[x] -= amount; //debiter
        net[y] += amount;  //crediter
    }

    multiset<pair<string, int>, person_compare> m;
    //Init a Multiset of Persons
    for (auto p : net) {
        string person = p.first;
        int amount = p.second;

        if (net[person] != 0) {
            //cout << person << " " << amount << endl;
            m.insert(make_pair(person, amount));
        }
    }

    //Start settling persons greedily one by one
    int cnt = 0;
    while (!m.empty()) {
        auto low = m.begin();
        auto high = prev(m.end());


        int debit = low->second;
        string debit_person = low->first;

        int credit = high->second;
        string credit_person = high->first;

        //Erase
        m.erase(low);
        m.erase(high);

        int settled_amount = min(-debit, credit);

        //Before
        // cout<<"Before "<<debit <<" and "<<credit<<endl;

        debit += settled_amount;
        credit -= settled_amount;
        cout << debit_person << " pays " << settled_amount << " to " << credit_person << endl;

        //  cout<<"After "<<debit <<" and "<<credit<<endl;

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

