package kalba.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "account")
@Entity
public class Account {
    @Id
    Long id;
    String name;
    String tag;
    String nickName;
    String password;
    String role;
    String attackState;
    String warningState;
}
